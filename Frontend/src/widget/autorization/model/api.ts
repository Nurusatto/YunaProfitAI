import { API } from "@/shared/api/instanse";
import type { authType } from "./type";
import { api } from "@/config/api";

export const postLogin = async (user: authType) => {
  console.log(user);
  const res = await API.post(api.Auth.LOGIN, user);
  return res.data;
};
