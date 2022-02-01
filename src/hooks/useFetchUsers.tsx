import useSWR from "swr";
import {UserService} from "../services/UserService";

export function useFetchUsers<Data = any, Error = any>(limit: number, offset: number): { data: Data; error: Error } {
  const { data, error } = useSWR(["users", limit, offset], async (key, limit, offset) => {
    const response = await UserService.users(limit, offset);
    return response; 
  }, { 
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
   });

  return { data, error };
}