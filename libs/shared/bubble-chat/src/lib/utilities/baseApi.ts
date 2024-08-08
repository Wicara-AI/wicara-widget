export class BaseApiRequest {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public get = async (url: string, signal?: AbortSignal) => {
        return fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            signal,
        });
    };

    public post = async <TData>(url: string, data: TData, signal?: AbortSignal) => {
        return fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal,
        });
    };
}
