/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse, ResponseType } from 'axios';

export type ApiError = {
  description: string;
  errorCode: string;
  status: string;
  payload?: {
    file?: string;
  };
};

export type ObjectField = string | number | symbol;

export type BackendData<T = ResponseType, D extends ObjectField = 'result'> = {
  [keys in D]: T;
};

export type BackendResponse<T> = AxiosResponse<BackendData<T> & ApiError>;

export type RequestPayload = {
  url: string;
  params?: Record<string, unknown> | null;
  paramsSerializer?: (params: any) => string;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};
export type RequestDataPayload = RequestPayload & {
  data: Record<string, unknown>;
};

export enum SNACKBAR_SEVERITY {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}
