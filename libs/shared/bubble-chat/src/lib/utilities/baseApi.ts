export type ApiHeaders = {
  apiKey: string;
  apiSecret: string;
  appId: string;
  session: string;
};

export class BaseApiRequest {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public get = async (url: string, apiHeaders: ApiHeaders, signal?: AbortSignal) => {

        return fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: {
              'x-api-key': apiHeaders.apiKey,
              'x-api-secret': apiHeaders.apiSecret,
              'x-app-id': apiHeaders.appId,
              'x-session': apiHeaders.session,
              'Accept': 'application/json',
            },
            signal,
        });
    };

    public post = async <TData>(url: string, data: TData, apiHeaders: ApiHeaders, signal?: AbortSignal) => {
        return fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'x-api-key': apiHeaders.apiKey,
                'x-api-secret': apiHeaders.apiSecret,
                'x-app-id': apiHeaders.appId,
                'x-session': apiHeaders.session,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal,
        });
    };
}
