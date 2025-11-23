export const AiKey = import.meta.env.VITE_AI_KEY;

export const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const api = {
  AI: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",

  Auth: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",

    Me: "/api/auth/me",
  },

  Token: {
    UpdateToken: "/api/auth/refresh",
  },
};
