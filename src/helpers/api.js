import axios from "axios";
import { useAuthStore } from '@/stores';


export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  const { claim } = useAuthStore();
  const isLoggedIn = !!claim?.AccessToken;
  const isApiUrl = request.baseURL.startsWith(import.meta.env.VITE_API_URL);
  if (isLoggedIn && isApiUrl) {
    request.headers.Authorization = `Bearer ${claim.AccessToken}`
  }
  return request
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const authStore = useAuthStore();
    const originalConfig = err.config;

    if(!authStore.user) {
      return Promise.reject(err);
    }

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await authStore.refreshToken();
          axiosInstance.defaults.headers.Authorization = `Bearer ${authStore.claim.AccessToken}`
          return axiosInstance(originalConfig);
        } catch (_error) {
          authStore.logout()
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);