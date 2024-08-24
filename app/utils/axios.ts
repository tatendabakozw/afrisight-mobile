import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";

function useAxiosInstance() {
  const { getToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://192.168.194.101:5500/mobile/v1", // Replace with your API base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to include the Clerk token
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken(); // Optional: specify the token template
      console.log({ token });
      // TODO: Implement proper authentication

      if (token) {
      }
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default useAxiosInstance;
