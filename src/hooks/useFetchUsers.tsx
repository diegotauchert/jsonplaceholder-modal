import useSWR from "swr";
import {UserService} from "../services/UserService";

export function useFetchUsers<Data = any, Error = any>(limit: number, offset: number) {
  const { data, error } = useSWR('/users', async () => {
    const response = await UserService.users(limit, offset);
    return response; 
  });

  return { data, error };
}