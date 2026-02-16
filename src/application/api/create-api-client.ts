import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { authService } from '../services/auth-service';
import { logger } from '../services/logger';
import { createRefreshQueue } from './refresh-queue';

type RetriableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export function createApiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const refreshQueue = createRefreshQueue();

  /* =========================
     REQUEST INTERCEPTOR
  ========================= */

  api.interceptors.request.use((config) => {
    const token = authService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /* =========================
     RESPONSE INTERCEPTOR
  ========================= */

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequest;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (refreshQueue.getRefreshingState()) {
          return new Promise<string | null>((resolve, reject) => {
            refreshQueue.enqueue({ resolve, reject });
          })
            .then((token) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        refreshQueue.setRefreshingState(true);

        try {
          const newToken = await authService.refreshToken();

          if (!newToken) {
            throw new Error('Failed to refresh token');
          }

          refreshQueue.processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          refreshQueue.processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          refreshQueue.setRefreshingState(false);
        }
      }

      logger.error('API Error', error);

      const message = (error.response?.data as { message?: string })?.message ?? 'Erro inesperado';

      toast.error(message);

      return Promise.reject(error);
    },
  );

  return api;
}
