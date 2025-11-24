import { API } from "@/shared/api/instanse";
import { api } from "@/config/api";
import type { authType } from "@/widget/register/model/type";

export const postRegister = async (data: authType) => {
  const res = await API.post(api.Auth.REGISTER, data);
  return res.data;
};
