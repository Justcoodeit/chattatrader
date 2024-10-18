import { createBuilder } from '@ibnlanre/portal';
import { ENDPOINTS } from '../endpoints';
import { _axios } from '../axios';
import { getCookie } from 'cookies-next';
import { COOKIES } from '../constants';

export const auth_request_builder = createBuilder({
  register: (userData) => {
    return _axios.post(ENDPOINTS.auth.register(), userData);
  },

  login: (loginData) => {
    const token = getCookie(COOKIES.auth_Temp);
    return _axios.post(ENDPOINTS.auth.login(), loginData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
});

export const user_requests_builder = createBuilder({
  // get_all_chat: () => _axios.get(ENDPOINTS.users.base()),
  task: {
    get_all: () => _axios.get(ENDPOINTS.tasks.base()),
    single: (id) => _axios.get(ENDPOINTS.tasks.single(id)),
    verify: (taskId) => _axios.post(ENDPOINTS.verify.base(), { taskId }),
  },
  user: {
    create_chat: (ChatData) => {
      return _axios.post(ENDPOINTS.user.create_chat(), ChatData);
    },
    create_buy: (ChatData) => {
      return _axios.post(ENDPOINTS.user.create_buy(), ChatData);
    },

    user_info: () => _axios.get(ENDPOINTS.user.get_user()),
    delete_chat: (id) => _axios.get(ENDPOINTS.user.delete_chat(id)),
    points: () => _axios.get(ENDPOINTS.user.points()),
    get_all_chat: (id) => _axios.get(ENDPOINTS.user.get_chat(id)),
    get_single_chat: (chatId) =>
      _axios.get(ENDPOINTS.user.get_single_chat(chatId)),
  },
  referral: {
    generate_code: () => _axios.post(ENDPOINTS.user.referral.generate_code()),
    referral_use: (referralCode) =>
      _axios.post(ENDPOINTS.user.referral.use_code(), { referralCode }),
  },
});
