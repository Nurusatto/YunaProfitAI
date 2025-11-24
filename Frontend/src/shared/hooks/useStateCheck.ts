import { useUserStore } from "@/store/useUserStore";

export const Check = () => {
  console.log(useUserStore.getState());
};
