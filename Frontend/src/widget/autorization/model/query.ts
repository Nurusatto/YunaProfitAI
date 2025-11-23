import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/widget/autorization/model/api";
import type { AxiosError } from "axios";
import type { authType } from "./type";

export const useLogin = () => {
  return useMutation<unknown, AxiosError, authType>({
    mutationFn: (user) => postLogin(user),
  });
};
