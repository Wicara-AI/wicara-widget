import { baseUrl } from "../config";
import { ApiResponse, GetThemeResponseData } from "../types/api";
import { Message } from "../types/message";
import { ApiHeaders, BaseApiRequest } from './baseApi';

export type RegisterUserRequest = {
  email: string;
  name: string;
  phone: string;
  session: string;
};

export type RegisterUserResponseData = {
  id: string;
};

const baseApi = new BaseApiRequest(baseUrl);

export const registerUser = async (data: RegisterUserRequest, apiHeaders: ApiHeaders, signal: AbortSignal) => {
    const response = await baseApi.post('/widget/register', data, apiHeaders, signal);

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    const body = await response.json() as ApiResponse<RegisterUserResponseData>;

    if (body.status === "fail") {
        throw new Error(body.message);
    }

    return body.data;
};

export const getThemeFromClient = async (apiHeaders: ApiHeaders, signal: AbortSignal): Promise<GetThemeResponseData> => {
  const response = await baseApi.get(`/widget/theme`, apiHeaders, signal);

  const body = await response.json() as ApiResponse<GetThemeResponseData>;

  if (body.status === "fail" || response.ok === false) {
    throw new Error(body.message);
  }

  return body.data;
}

export type GetProfileResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const getProfile = async (apiHeaders: ApiHeaders, signal: AbortSignal): Promise<GetProfileResponse> => {
  const response = await baseApi.get(`/widget/me`, apiHeaders, signal);

  const body = await response.json() as ApiResponse<GetProfileResponse>;

  if (body.status === "fail" || response.ok === false) {
    throw new Error(body.message);
  }

  return body.data;
}

export type GetMessageResponse = Message;

export type GetMessageRequest = {
  page: number;
  limit: number;
}

export const getMessages = async (params: GetMessageRequest, apiHeaders: ApiHeaders, signal: AbortSignal): Promise<GetMessageResponse[]> => {
  const searchParams = new URLSearchParams(params as unknown as Record<string, string>);
  const response = await baseApi.get(`/widget/messages?${searchParams}`, apiHeaders, signal);

  const body = await response.json() as ApiResponse<GetMessageResponse[]>;

  if (body.status === "fail" || response.ok === false) {
    throw new Error(body.message);
  }

  console.log('body', body);

  return body.data;
}
