import useSWR from "swr";
import {UserService} from "../services/UserService";

export function useFetchPosts<Data = any, Error = any>(user_id: number, limit: number, offset: number): { data: Data; error: Error } {
  const { data, error } = useSWR(["posts", user_id, limit, offset], async (key, user_id, limit, offset) => {
    const response = await UserService.posts(user_id, limit, offset);
    return response; 
  }, { 
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
   });

  return { data, error };
}