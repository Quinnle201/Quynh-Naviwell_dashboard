import axios from "axios";
import { useAuthStore } from '@/stores';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) => {
  return new Promise((resolve, reject) => {
    const authStore = useAuthStore();
    authStore.refreshToken().then(() => {
      const { claim } = useAuthStore();
      failedRequest.response.config.headers['Authorization'] = `Bearer ${claim.AccessToken}`
      resolve()
    }).catch(error => {
      authStore.logout()
      reject(error)
    });
  })
}

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);