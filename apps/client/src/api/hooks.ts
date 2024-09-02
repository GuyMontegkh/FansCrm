import { useQuery, useMutation } from '@tanstack/react-query';
import { getCurrentUser, loginUser, signUpUser } from './auth';
import { QUERY_KEYS } from './queryKeys';
import { REFRESH_INTERVAL_MS } from '@/lib/constants';
import { UserDataType } from './types';

export const useUserInfo = ({ id, enabled }: { enabled: boolean; id: number }) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: () => getCurrentUser(id),
    enabled: enabled && !!id,
  });

export const useUserLogin = () =>
  useMutation({
    mutationFn: (data: UserDataType) => loginUser(data),
  });

export const useUserSingUp = () =>
  useMutation({
    mutationFn: (data: UserDataType) => signUpUser(data),
  });
