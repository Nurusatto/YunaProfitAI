import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/widget/register/model/api";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => postRegister(data),
  });
};
