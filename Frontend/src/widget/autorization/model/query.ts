import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/widget/autorization/model/api";
import type { AxiosError } from "axios";
import type { authType, authResponse, authError } from "./type";

export const useLogin = () => {
  return useMutation<authResponse, AxiosError<authError>, authType>({
    mutationFn: (user) => postLogin(user),
  });
};
