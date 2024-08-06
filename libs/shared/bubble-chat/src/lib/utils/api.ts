import { baseUrl } from "../config";
import { ApiResponse, AuthenticationHeader, GetThemeRequest, GetThemeResponseData } from "../types/api";


export function fetchInit(input: RequestInfo | URL, init?: RequestInit & {
  headers: RequestInit["headers"] & AuthenticationHeader;
}): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      "X-API-KEY": init?.headers.apiKey,
      "X-CLIENT-ID": init?.headers.clientId,
      "X-CLIENT-SECRET": init?.headers.clientSecret,
      "X-SESSION-ID": init?.headers.sessionId,
    },
  } as RequestInit);
}

export async function getThemeFromClient({apiKey, clientId, clientSecret, sessionId, signal}: GetThemeRequest): Promise<GetThemeResponseData> {
  const response = await fetchInit(`${baseUrl}/theme`, {
    method: "GET",
    headers: {
      apiKey: apiKey,
      clientId: clientId,
      clientSecret: clientSecret,
      sessionId: sessionId,
    },
    signal: signal,
  });

  const body = await response.json() as ApiResponse<GetThemeResponseData>;

  if (body.status === "fail" || response.ok === false) {
    throw new Error(body.message);
  }

  return body.data;
}
