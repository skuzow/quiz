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
    const locale = useCookie('i18n_redirected');

    return this.$fetch<ApiResponse<T>>(url, {
      method,
      body,
      headers: {
        'Accept-Language': locale.value || 'en',
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    });
  }
}

export default HttpFactory;
