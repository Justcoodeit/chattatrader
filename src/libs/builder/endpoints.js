export const ENDPOINTS = Object.freeze({
  auth: {
    register: () => '/users/register',
    login: () => '/users/login',
  },
  tokens: {
    trendingToken: () => '/tokens/trending',
  },

  tasks: {
    base: () => '/tasks/',
    single: (task_id) => `/tasks/${task_id}`,
    admin: {
      base: () => '/admin/tasks',
      create: () => '/admin/task/create',
      update: (task_id) => `/admin/task?id=${task_id}`,
      delete: (task_id) => `/admin/task/${task_id}`,
    },
  },
  verify: {
    base: () => '/verify',
    create: () => '/admin/task/create',
    retweet: () => '/verify/',
    post_verify: (taskId) => `/verify/${taskId}`,
  },
  user: {
    create_chat: () => '/chats/createchat',
    create_buy: () => '/chats/buy',
    delete_chat: () => '/deletechat',
    get_history: (userId) => `/transactions/history/${userId}`,
    get_chat: (userId) => `/chats/getchats?userId=${userId}`,
    get_single_chat: (chatId) => `/chats/getchat?chatId=${chatId}`,
    get_user: (userId) => `/users/getuser?userId=${userId}`,
    get_rank: (id) => `/user/rank/${id}`,
    admin: {
      promote_user_to_admin: () => '/admin/user/promote',
      demote_user_to_admin: () => '/admin/user/demote',
    },
    referral: {
      generate_code: () => '/referral/code/',
      use_code: () => `/referral/use`,
      get_stats: () => '/referral/stats',
    },
  },
});

export const BASE_URL = 'https://18.130.216.255/';
