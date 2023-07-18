import axios, { AxiosRequestConfig } from "axios";

const apiURLs = {
  development: "http://localhost:1214",
  production: "https://airbnnbclone-onrender.com",
};

const api = axios.create({ baseURL: apiURLs["development"] });

api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Bearer="))
    ?.split("=")[1];

  if (token) {
    (config as AxiosRequestConfig).headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export { api };
