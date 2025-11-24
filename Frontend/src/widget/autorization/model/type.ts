export type authType = {
  email: string;
  password: string;
  name?: string;
};

export type authError = {
  error: string;
  message: string;
  statusCode: number;
};

export type authResponse = {
  accessToken: string;
};
