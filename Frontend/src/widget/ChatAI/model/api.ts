import axios from "axios";
import { AiKey, api } from "@/config/api";

export const postMessage = async (message: string) => {
  const res = await axios.post(
    api.AI,
    {
      model: "gemini-2.5-flash-lite",
      messages: [{ role: "user", content: message }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AiKey}`,
      },
    }
  );
  return res.data;
};
