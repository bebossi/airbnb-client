import axios, { AxiosRequestConfig } from "axios";

const apiURLs = {
  development: "http://localhost:1214",
  production: "https://airbnnbcloneapi.onrender.com",
};

const api = axios.create({ baseURL: apiURLs["development"] });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    (config as AxiosRequestConfig).headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export { api };
