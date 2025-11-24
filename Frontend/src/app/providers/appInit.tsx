import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { FetchMe } from "@/shared/api/fetchMe";

export function AppInit() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState();

  const setIsInitialized = useUserStore((s) => s.setInitial);
  const state = useUserStore.getState();

  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: FetchMe,
    retry: false,
  });

  useEffect(() => {
    if (data || isError) {
      setIsInitialized(true);
      console.log(data);
      console.log(state);

      if (data?.token) {
        setToken(data?.token);
        console.log(data);
      }
    }
  }, [data, isError, setIsInitialized, state]);

  return null;
}
