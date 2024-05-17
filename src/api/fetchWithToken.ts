import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import authRedirectService, { default as AuthRedirectService } from './authRedirectService';


function isAuthorizationPage(url: string): boolean {    
    return url.includes('auth.berekebank') || url.includes('barm-kratos-tls-b-platform')
}

const createApiClient = (baseURL: string): AxiosInstance => {
    const apiClient: AxiosInstance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = AuthRedirectService.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );
    apiClient.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response.request && response.request.responseURL !== response.config.url) {
                const redirectUrl = response.request.responseURL;
                
                if (isAuthorizationPage(redirectUrl)) {
                  authRedirectService.removeToken()
                  AuthRedirectService.redirectToAuth(redirectUrl);
                }
              }
    
            return response;
        },
        (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                const redirectUrl = error.response.headers.location;
                AuthRedirectService.redirectToAuth(redirectUrl)
                return
            }
            return Promise.reject(error);
        }
    );

    return apiClient;
};

export default createApiClient;
