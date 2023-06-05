import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,

  headers: {
    "X-requestd-with": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    Cookies.remove("user-email", { path: "" });

    const statusCode = error.response?.status;
    if (statusCode === 401) {
      Router.push("/landing?modal=login");
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
