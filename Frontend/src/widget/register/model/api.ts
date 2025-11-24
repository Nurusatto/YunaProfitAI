import { API } from "@/shared/api/instanse";
import { api } from "@/config/api";

export const postRegister = async (data) => {
  const res = await API.post(api.Auth.REGISTER, data);
  return res.data;
};
