import type { $Fetch, NitroFetchOptions } from 'nitropack';

interface HttpRequest {
  url: string;
  method:
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE';
  body?: object;
  fetchOptions?: NitroFetchOptions<'json'>;
}

interface ApiResponse<T> {
  statusCode: number;
  statusMessage: string;
  body: T;
}

abstract class HttpFactory {
  private readonly $fetch: $Fetch;

  constructor(fetch: $Fetch) {
    this.$fetch = fetch;
  }

  async call<T>({ method, url, body, fetchOptions }: HttpRequest) {
    const cookie = useRequestHeaders(['cookie']);

    return this.$fetch<ApiResponse<T>>(url, {
      method,
      body,
      headers: {
        ...cookie,
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    });
  }
}

export default HttpFactory;
