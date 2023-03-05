import axios from "axios";
import { API_URL } from "../config";
import { getStorage } from "./storageService";

axios.interceptors.request.use(async (config) => {
  config.baseURL = API_URL;

  const token = await getStorage("@token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    axios.defaults.headers.common.Authorization &&
      delete axios.defaults.headers.common.Authorization;
    config.headers = axios.defaults.headers;
  }
  return config;
});

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // if (!expectedError) {
  //   return Promise.reject(error);
  // }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
