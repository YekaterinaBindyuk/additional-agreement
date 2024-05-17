import createApiClient from "./fetchWithToken";
import { BackendResponse, RequestDataPayload, RequestPayload } from './types';

const apiURL = process.env.REACT_APP_BACKEND_URI;
export const apiClient = createApiClient(process.env.REACT_APP_GATEWAY_API);

export const getFromAPI = <T = void, P = false>(
  config: RequestPayload
): Promise<BackendResponse<T>> => apiClient.get(apiURL + config.url, config);

export const postToAPI = <T = void>(config: RequestDataPayload): Promise<BackendResponse<T>> =>
  apiClient.post(apiURL + config.url, config.data, config);

export const putToAPI = <T = void>(config: RequestDataPayload): Promise<BackendResponse<T>> =>
  apiClient.put(apiURL + config.url, config.data, config);

export const deleteFromAPI = <T = void>(config: RequestDataPayload): Promise<BackendResponse<T>> =>
  apiClient.delete(apiURL + config.url, config);

export const patchAPI = <T = void>(config: RequestDataPayload): Promise<BackendResponse<T>> =>
  apiClient.patch(apiURL + config.url, config.data, config);
