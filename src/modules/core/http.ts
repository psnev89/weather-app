interface IHttpClientRequestParams {
  url: string;
  payload: any;
}

interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParams): Promise<T>;
}

import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

class HttpClient implements IHttpClient {
  get<T>(parameters: IHttpClientRequestParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload } = parameters;
      const options: AxiosRequestConfig = {
        headers: {},
        params: payload,
      };

      axios
        .get(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
}

export const httpClient = new HttpClient();
