import { auth_request_builder, user_requests_builder } from './requests';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { COOKIES } from '../constants';

import { handleSuccess } from '../../utils/handle-success';
import { handleError } from '../../utils';
import { useAuth } from '../../../context/AuthContext';

import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: auth_request_builder.use().login,
    onSuccess: ({ data }, context) => {
      if (data?.token) {
        login(data.token);
        // qc.invalidateQueries('user');
        if (context && typeof context.onLoginSuccess === 'function') {
          context.onLoginSuccess();
        }
        navigate('/');
      } else {
        console.warn('No token received in login response');
      }
    },
    onError: handleError,
  });
}

export function useCreateChat() {
  return useMutation({
    mutationFn: user_requests_builder.use().user.create_chat,
    onSuccess: ({ data }) => {
      // handleSuccess(data);
    },
    onError: handleError,
  });
}

export function useCreateBuyToken() {
  return useMutation({
    mutationFn: user_requests_builder.use().user.buyToken,
    onSuccess: ({ data }) => {
      // handleSuccess(data);
    },
    onError: handleError,
  });
}

export function useDeleteChat() {
  return useMutation({
    mutationFn: user_requests_builder.use().user.delete_chat,
    onSuccess: ({ data }) => {
      handleSuccess(data);
    },
    onError: handleError,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: auth_request_builder.use().register,
    onSuccess: ({ data }) => {
      handleSuccess(data);
      // Optionally, you can invalidate queries or perform additional actions here
    },
    onError: handleError,
  });
}

export function useSocketConnection() {
  return useQuery({
    queryKey: ['socketConnection'],
    queryFn: () => {
      const socket = io('https://api.chattatrader.com', {
        transports: ['websocket'],
      });

      return new Promise((resolve, reject) => {
        socket.on('connect', () => {
          console.log('Socket connected');
          resolve(socket);
        });

        socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          reject(error);
        });
      });
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useVerifyTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: user_requests_builder.use().task.verify,
    onSuccess: ({ data }, variables) => {
      handleSuccess(data);
      // Invalidate the query for all tasks
      qc.invalidateQueries({
        queryKey: user_requests_builder.task.get_all.get(),
      });

      // Invalidate the query for the single task that was verified
      qc.invalidateQueries({
        queryKey: user_requests_builder.task.single.get(variables.taskId),
      });

      // Invalidate the user profile info query
      qc.invalidateQueries({
        queryKey: user_requests_builder.user.profile_info.get(),
      });

      qc.invalidateQueries({
        queryKey: user_requests_builder.user.leaderboard.get(),
      });
    },
    onError: handleError,
  });
}

export function useGenerateCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: user_requests_builder.use().referral.generate_code,
    onSuccess: ({ data }) => {
      handleSuccess(data);
      qc.invalidateQueries({
        queryKey: user_requests_builder.user.profile_info.get(),
      });
    },
    onError: handleError,
  });
}
export function useCreateBuy() {
  return useMutation({
    mutationFn: user_requests_builder.use().user.create_buy,
    onSuccess: ({ data }) => {
      handleSuccess(data);
      console.log(data);
    },
    onError: handleError,
  });
}

export function useReferralCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: user_requests_builder.use().referral.referral_use,
    onSuccess: ({ data }) => {
      handleSuccess(data);
      qc.invalidateQueries({
        queryKey: user_requests_builder.user.profile_info.get(),
      });
    },
    onError: handleError,
  });
}

export function useValidateLoginAttempt() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: auth_request_builder.use().send_auth_params,
    onSuccess: ({ data }, context) => {
      console.log({ data });
      if (data?.data?.token) {
        // deleteCookie(COOKIES.auth_Temp);
        Cookies.set(COOKIES.auth_Token, data.data.token, { expires: 7 });

        // Invalidate queries that might depend on the user's authentication status
        qc.invalidateQueries('user');

        // Call the onLoginSuccess callback if provided
        if (context && typeof context.onLoginSuccess === 'function') {
          context.onLoginSuccess();
        }
      } else {
        console.warn('No token received in login response');
      }
    },
    onError: (error) => {
      console.error('Login attempt failed:', error);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  // const router = useRouter();

  return useMutation({
    mutationFn: () => {
      qc.cancelQueries();
      qc.clear();
      Cookies.remove('authTokenized');
      localStorage.removeItem('authToken');
      return Promise.resolve();
    },
    onSuccess: () => {
      // You can add any additional actions here
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
}
