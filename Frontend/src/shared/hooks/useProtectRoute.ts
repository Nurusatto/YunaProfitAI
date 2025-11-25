import { redirect } from "@tanstack/react-router";
import { useUserStore } from "@/store/useUserStore";

export async function ProtectRoute() {
  const { isInitialized, token } = useUserStore.getState();
  console.log("ProtectRoute called");

  console.log(isInitialized, token);

  if (!token) {
    throw redirect({ to: "/auth" });
  }

  return true;
}
