export const axiosConfig = {
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    headers: {
      Authorization: `Bearer ${process.env.AI_KEY}`,
      "Content-Type": "application/json"
    }
  }