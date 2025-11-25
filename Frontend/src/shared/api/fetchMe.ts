import { api } from "@/config/api";
import { API } from "./instanse";

export const FetchMe = async () => {
  // const getToken = await API.post("/api/auth/refresh"); //refresh

  // const getUser = await API.get(api.Auth.Me, {
  //   headers: {
  //     Authorization: `Bearer ${getToken.data.accessToken}`,
  //   },
  // }); //auth me

  // const userData = await getUser.data;
  // const token = await getToken.data;

  // return { userData, token };
  try {
    const getToken = await API.get(api.Token.UpdateToken);
    const getUser = await API.get(api.Auth.Me, {
      headers: {
        Authorization: `Bearer ${getToken.data.accessToken}`,
      },
    });

    const userData = await getUser.data;
    const token = await getToken.data;

    return { userData, token };
  } catch {
    return null;
  }
};
