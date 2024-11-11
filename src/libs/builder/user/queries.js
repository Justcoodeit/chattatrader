import { useQuery } from '@tanstack/react-query';
import { user_requests_builder } from './requests';

// export function useGetUserTasks() {
//   return useQuery({
//     queryKey: user_requests_builder.task.get_all.get(),
//     queryFn: user_requests_builder.use().task.get_all,
//   });
// }
// export function useGetUserSingleTask(id) {
//   return useQuery({
//     queryKey: user_requests_builder.task.single.get(id),
//     queryFn: () => user_requests_builder.use().task.single(id),
//     enabled: !!id,
//   });
// }
export function useGetUserSingleChat(id) {
  return useQuery({
    queryKey: ['userSingleChat', id],
    queryFn: () => user_requests_builder.use().user.get_all_chat(id),
    enabled: !!id,
  });
}
export function useGetUserSingleChatWithID(id) {
  return useQuery({
    queryKey: ['userSingleChatWithID', id],
    queryFn: () => user_requests_builder.use().user.get_single_chat(id),
    enabled: !!id,
  });
}

export function useGetUserInfo() {
  return useQuery({
    queryKey: user_requests_builder.user.user_info.get(),
    queryFn: user_requests_builder.use().user.user_info,
  });
}

export function useGetTrendingTokens() {
  return useQuery({
    queryKey: user_requests_builder.tokens.get_trending_tokens.get(),
    queryFn: user_requests_builder.use().tokens.get_trending_tokens,
  });
}
// export function useGetTaskHistory() {
//   return useQuery({
//     queryKey: user_requests_builder.user.task_history.get(),
//     queryFn: user_requests_builder.use().user.task_history,
//   });
// }
export function useGetProfileInformation(id) {
  return useQuery({
    queryKey: ['useGetProfileInformatio', id],
    queryFn: () => user_requests_builder.use().user.user_info(id),
    enabled: !!id,
  });
}

// export function useGetPoints() {
//   return useQuery({
//     queryKey: user_requests_builder.user.points.get(),
//     queryFn: user_requests_builder.use().user.points,
//   });
// }

// export function useGetRank() {
//   return useQuery({
//     queryKey: user_requests_builder.user.get_rank.get(),
//     queryFn: user_requests_builder.use().user.get_rank,
//   });
// }
