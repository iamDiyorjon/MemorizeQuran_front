import { handleError } from "./error-handle";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // console.log('Request:', config);

  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  // console.log('Response:', response);

  return response;
};

export const errorInterceptor = (error: unknown) => {
  handleError(error);

  return Promise.reject(error);
};
