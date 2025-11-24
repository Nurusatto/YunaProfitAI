import { redirect } from "@tanstack/react-router";
import { useUserStore } from "@/store/useUserStore";

export async function ProtectRoute() {
  const { initial } = useUserStore.getState();

  if (!initial) {
    throw redirect({ to: "/auth" });
  }

  return true;
}
