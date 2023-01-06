import axios from "axios";

const fetch = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

fetch.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("something went wrong to request", error);
  }
);

export default fetch;
