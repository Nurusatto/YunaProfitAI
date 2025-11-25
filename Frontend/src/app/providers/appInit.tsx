import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { FetchMe } from "@/shared/api/fetchMe";

export function AppInit() {
  const setIsInitialized = useUserStore((s) => s.setIsInitialized);
  const setToken = useUserStore((s) => s.setAccessToken);

  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: FetchMe,
    retry: false,
  });

  useEffect(() => {
    if (data !== undefined) {
      setIsInitialized(true);

      if (!data) {
        setToken(null);
        return;
      }

      setToken(data?.token.accessToken);
    }
  }, [data, isError, setIsInitialized, setToken]);

  return null;
}
