import { api } from "@/config/api";
import { API } from "./instanse";

export const FetchMe = async () => {
  const getToken = await API.get(api.Auth.Me);
  console.log(getToken);
  const token = await getToken.data;
  return { token };
};
