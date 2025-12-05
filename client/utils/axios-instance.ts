import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps } from "@/types";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { useLocale } from "next-intlayer";



interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}
interface AxiosProps {
  method?: string;
  url: string;
  data?: object | null;
  headers?: AxiosRequestConfig["headers"];
  withCredentials?: boolean;
  baseURL?: string;
}
let refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;


const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    const code = error.response.data.code;

    if (code === "expired_token" && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const _ = await axios.post(
            `${ENDPOINTS.http_client_base}${ENDPOINTS.refresh_token}`
          );
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue = [];
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          if (window.location.pathname !== ROUTES.sign_in)
            window.location.href = `${ROUTES.sign_in}?next=${window.location.pathname}`;
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

const customRequest = async ({
  method = "get",
  url,
  headers = {},
  data = {},
  withCredentials = true,
  baseURL = ENDPOINTS.http_client_base,
}: AxiosProps) => {
  return await axiosInstance({ method, url: url.endsWith("/") ? url.slice(0, -1) : url, data, headers, withCredentials, baseURL });
}


export const getRequest = async (params: AxiosProps) =>
  await customRequest(params);
export const postRequest = async (params: AxiosProps) =>
  await customRequest({ ...params, method: "post" });
export const putRequest = async (params: AxiosProps) =>
  await customRequest({ ...params, method: "put" });
export const patchRequest = async (params: AxiosProps) =>
  await customRequest({ ...params, method: "patch" });
export const deleteRequest = async (params: AxiosProps) =>
  await customRequest({ ...params, method: "delete" });
export const getDataError = (error: AxiosErrorProps) => {
  return {
    message: error.response?.data?.message || "An unknown error occurred.",
    status: error.response?.status,
  };
};

export const getValidationError = (error: AxiosErrorProps) => {
  return {
    data: error.response?.data,
    status: error.response?.status,
  };
};
