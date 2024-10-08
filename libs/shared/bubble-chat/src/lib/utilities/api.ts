import { baseUrl } from "../config";
import { ApiResponse, GetThemeResponseData } from "../types/api";
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

