import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { GetToken } from "../services/auth.service";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export const axiosService = axios;

const api = axios.create({
  timeout: 60 * 1000,
});

api.interceptors.request.use(
  (config) => {
    // let token = GetToken();
    return {
      ...config,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        // 'x-access-token': token
      },
    };
  },
  (exc) => Promise.reject(exc)
);

export { api };
