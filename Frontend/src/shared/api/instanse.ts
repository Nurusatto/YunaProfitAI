import axios from "axios";
import { api, BackendUrl } from "@/config/api";
import { useUserStore } from "@/store/useUserStore";

export const API = axios.create({
  baseURL: BackendUrl,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = await API.get(api.Token.UpdateToken);

        useUserStore.getState().setAccessToken(data.accessToken);

        original.headers.Authorization = `Bearer ${data.accessToken}`;

        return API.request(original);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        useUserStore.getState().logOut();
      }
    }
    return Promise.reject(error);
  }
);
