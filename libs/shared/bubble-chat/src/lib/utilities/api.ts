import { baseUrl } from '../config'
import { ApiResponse, GetThemeResponseData } from '../types/api'
import { InboundMessage } from '../types/inboundMessage'
import { OutboundMessage } from '../types/outboundMessage'
import { ApiError, ApiHeaders, BaseApiRequest } from './baseApi'

export type RegisterUserRequest = {
  email: string
  name: string
  phone: string
  session: string
}

export type RegisterUserResponseData = {
  conversationId: string
  channelAccountId: string
  accessToken: string
}

const baseApi = new BaseApiRequest(baseUrl)

export const registerUser = async (
  data: RegisterUserRequest,
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
) => {
  const response = await baseApi.post(
    '/widget/register',
    data,
    apiHeaders,
    signal,
  )

  if (!response.ok) {
    throw new ApiError('Failed to register user')
  }

  const body = (await response.json()) as ApiResponse<RegisterUserResponseData>

  if (body.status === 'fail') {
    throw new ApiError(body.message)
  }

  return body.data
}

export const getThemeFromClient = async (
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
): Promise<GetThemeResponseData> => {
  const response = await baseApi.get(`/widget/theme`, apiHeaders, signal)

  const body = (await response.json()) as ApiResponse<GetThemeResponseData>

  if (body.status === 'fail' || response.ok === false) {
    throw new ApiError(body.message)
  }

  return body.data
}

export type GetProfileResponse = {
  id: string
  name: string
  email: string
  phone: string
}

export const getProfile = async (
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
): Promise<GetProfileResponse> => {
  const response = await baseApi.get(`/widget/me`, apiHeaders, signal)

  const body = (await response.json()) as ApiResponse<GetProfileResponse>

  if (body.status === 'fail' || response.ok === false) {
    throw new ApiError(body.message)
  }

  return body.data
}

export type GetMessageResponse = InboundMessage

export type GetMessageRequest = {
  page: number
  limit: number
}

export const getMessages = async (
  params: GetMessageRequest,
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
): Promise<GetMessageResponse[]> => {
  const searchParams = new URLSearchParams(
    params as unknown as Record<string, string>,
  )
  const response = await baseApi.get(
    `/widget/messages?${searchParams}`,
    apiHeaders,
    signal,
  )

  const body = (await response.json()) as ApiResponse<GetMessageResponse[]>

  if (body.status === 'fail' || response.ok === false) {
    throw new ApiError(body.message)
  }

  console.log('body', body)

  return body.data
}

export const sendMessage = async (
  data: OutboundMessage,
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
): Promise<void> => {
  const response = await baseApi.post(
    '/widget/message',
    data,
    apiHeaders,
    signal,
  )

  const body = (await response.json()) as ApiResponse

  if (!response.ok || body.status === 'fail') {
    throw new ApiError('Failed to send message', response.status)
  }

  return
}

export type UploadFileRequest = {
  file: Blob | File
  fileName?: string
}

export type UploadFileResponse = {
  id: string
  name: string
  path: string
}

export const uploadFile = async (
  data: UploadFileRequest,
  apiHeaders: ApiHeaders,
  signal: AbortSignal,
): Promise<UploadFileResponse> => {
  const formData = new FormData()

  // Handle both Blob and File objects
  if (data.file instanceof File) {
    // If it's a File object, use it directly
    formData.append('file', data.file)
  } else {
    // If it's a Blob, we need to ensure we have a filename
    const fileName = data.fileName || 'blob-file'
    formData.append('file', data.file, fileName)
  }

  const response = await baseApi.post(
    '/widget/upload',
    formData,
    {
      ...apiHeaders,
      'Content-Type': 'multipart/form-data',
    },
    signal,
    {
      isFormData: true,
    },
  )

  const body =
    (await response.json()) as unknown as ApiResponse<UploadFileResponse>

  if (response.ok === false || body.status === 'fail') {
    throw new ApiError('Failed to upload file', response.status)
  }

  return body.data
}
