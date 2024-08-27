import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";
import { AUTH_ROUTES } from "@/constants/routers";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.151.101:5500/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        const response = await axios.post(AUTH_ROUTES.REFRESH_TOKEN, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        router.replace("/(auth)");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
