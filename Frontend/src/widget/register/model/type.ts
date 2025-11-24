export type authType = {
  name: string;
  email: string;
  password: string;
};

export type authResponse = {
  accessToken: string;
};

export type authError = {
  message: string;
  error: string;
  statusCode: number;
};
