import {connect} from "../Api";
import {IUser} from "../../interfaces/IUser";
import {IPost} from "../../interfaces/IPost";

export class UserService {

  static async users(limit?:number, offset?:number): Promise<any> {
    const params = new URLSearchParams([
      ['_limit', limit?.toString() || "3"], 
      ['_start', offset?.toString() || '0']
    ]);

    return await connect.get<IUser[]>('/users', { params })
      .then(res => res)
      .catch(err => err)
  }

  static async posts(user_id:number, limit?:number, offset?:number): Promise<any> {
    const params = new URLSearchParams([
        ['userId', user_id?.toString()], 
        ['_limit', limit?.toString() || "3"], 
        ['_start', offset?.toString() || '0']
      ]);

    return await connect.get<IPost[]>('/posts', { params })
      .then(res => res)
      .catch(err => err)
  }
}
