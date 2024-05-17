import { AxiosError } from "axios";
import { UNAUTHORIZED_STATUS } from "./const";

class AuthRedirectService {
  private static instance: AuthRedirectService;
  private tokenKey = "authToken";

  static getInstance(): AuthRedirectService {
    if (!AuthRedirectService.instance) {
      AuthRedirectService.instance = new AuthRedirectService();
    }
    return AuthRedirectService.instance;
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }

  handleApiError(error: AxiosError) {
    if (error.response && error.response.status === UNAUTHORIZED_STATUS) {
      const redirectUrl = error.response.headers.Location;
      this.removeToken();
      this.redirectToAuth(redirectUrl);
    }
  }

  redirectToAuth(url: string) {
    window.location.href = url;
  }
}

export default AuthRedirectService.getInstance();
