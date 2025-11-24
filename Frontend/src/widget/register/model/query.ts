import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/widget/register/model/api";
import type { authError, authResponse, authType } from "./type";
import type { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<authResponse, AxiosError<authError>, authType>({
    mutationFn: (data) => postRegister(data),
  });
};
