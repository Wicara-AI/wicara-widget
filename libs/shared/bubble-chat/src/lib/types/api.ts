import { Theme } from "./theme";

export type AuthenticationHeader = {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  sessionId: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseSuccess<TData = any> = {
  status: "success";
  message: string;
  data: TData;
};

export type ResponseError = {
  status: "fail";
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<TData = any> = ResponseSuccess<TData> | ResponseError;

export type GetThemeResponseData = Theme;

export type CommonRequest = AuthenticationHeader & {
  signal: AbortSignal;
};

export type GetThemeRequest = CommonRequest;
