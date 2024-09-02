import axios from 'axios';
import authService from './authService';
import { RefreshData, UserDataType } from './types';
import { BASE_URL } from '@/lib/constants';
import { AuthUserType } from '@/lib/types/user';

export const getCurrentUser = (id: number): Promise<AuthUserType> =>
  authService.get(`/get-user/${id}`).then((res) => res?.data);

export const loginUser = (data: UserDataType) =>
  axios.post(`${BASE_URL}auth/login`, data).then((res) => res?.data);

export const signUpUser = (data: UserDataType) =>
  axios.post(`${BASE_URL}add-user`, data).then((res) => res?.data);

export const refreshToken = (data: RefreshData) =>
  axios.post(`${BASE_URL}auth/refresh-token`, data).then((res) => res?.data);
