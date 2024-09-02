import axios from 'axios';
import { BASE_URL, STORAGE_KEYS } from '../lib/constants';
import { UserType } from '../lib/types/user';
import { refreshToken } from './auth';

const authService = axios.create({ baseURL: BASE_URL });

const getRefreshToken = () => {
  const user: UserType = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) ?? '');
  return user.refresh_token;
};

const getRefreshTokenBody = () => {
  const user: UserType = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) ?? '');
  return {
    userId: user.id,
    refreshToken: user.refresh_token,
  };
};

const refreshAccessToken = async () => {
  try {
    const body = getRefreshTokenBody();
    const response = await refreshToken(body);
    const newAccessToken = response.access_token;
    const user: UserType = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) ?? '');
    user.access_token = newAccessToken;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return newAccessToken;
  } catch (error) {
    console.error('Refresh token failed:', error);
    logoutUser();
    return null;
  }
};

const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  // window.location.reload();
};

authService.interceptors.request.use(
  async (config) => {
    const user: UserType = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) ?? '');
    const accessToken = user.access_token;

    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    } else {
      delete config.headers['Authorization'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authService.interceptors.response.use(
  (response) => {
    if (response.data?.result && 'status' in response.data.result && !response.data.result.status) {
      throw new Error(response.data.result?.message);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (getRefreshToken()) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return authService(originalRequest);
        }
      }

      logoutUser();
    }

    return Promise.reject(new Error(error?.response?.data?.error?.message ?? error?.message));
  },
);

export default authService;
