import axios from "axios";
import { BackendUrl } from "@/config/api";

export const API = axios.create({
  baseURL: BackendUrl,
  withCredentials: true,
});
