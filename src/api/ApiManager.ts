import axios from "axios";
import { vanillaAuthState } from "../store/auth_store";
const BASE_URL = "http://localhost:8000"

export type KeyValue = { [key: string]: string | number };

const instance = axios.create({
  // baseURL: "http://192.168.100.15:8000/api/",
  baseURL: `${BASE_URL}/api`,
  //baseURL: "https://erp-demo-v1.ismaeland.com/api/",
  //timeout: 4000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

const no_auth_http = axios.create({
  // baseURL: "http://192.168.100.15:8000/api/",
  //baseURL: "https://erp-demo-v1.ismaeland.com/api/",
  baseURL:  `${BASE_URL}/api`,
  timeout: 20000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const access = vanillaAuthState.getState().access;
    config.headers.setAuthorization(`Bearer ${access}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Triggered by 2xx status
    console.log(`http ${response.status} ${response.config.url}}`);
    return response;
  },
  function (error) {
    // Triggered by anything other than 2xx

    if (error.response.status == 401) {
      vanillaAuthState.getState().logout();
    }
    console.log(`http ${error.status} ${error.config.url}}`);
    return Promise.reject(error);
  }
);

const get = (url: string) => {
  return instance(url, { method: "get" });
};
const post = (url: string, data?: KeyValue) => {
  return instance(url, { method: "post", data: data });
};

const put = (url: string, data?: KeyValue) => {
  return instance(url, { method: "put", data: data });
};

const del = (url: string, data?: KeyValue) => {
  return instance(url, { method: "delete", data: data });
};

const http = {
  get: get,
  post: post,
  put: put,
  del: del,
};

export { http, no_auth_http, BASE_URL };
