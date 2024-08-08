import { ApiResponse } from "../types/api";
import { BaseApiRequest } from "./baseApi";

export type RegisterUserRequest = {
  email: string;
  name: string;
};

export type RegisterUserResponseData = {
  id: string;
};

const baseApi = new BaseApiRequest('http://localhost:3000');

export const registerUser = async (data: RegisterUserRequest, signal: AbortSignal) => {
    const response = await baseApi.post('/widget/register', data, signal);

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    const body = await response.json() as ApiResponse<RegisterUserResponseData>;

    if (body.status === "fail") {
        throw new Error(body.message);
    }

    return body.data;
};
