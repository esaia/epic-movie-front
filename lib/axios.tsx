import axios from "axios";
import { useRouter } from "next/router";

const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "X-requestd-with": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosAPI.interceptors.request.use(
  (config) => {
    console.log("intercepting request");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const router = useRouter();
      router.push("/landing");
    }

    return Promise.reject(error);
  }
);

export default axiosAPI;
