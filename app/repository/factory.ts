import type { $Fetch, NitroFetchOptions } from 'nitropack';

interface IHttpFactory {
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

abstract class HttpFactory {
  private readonly $fetch: $Fetch;

  constructor(fetch: $Fetch) {
    this.$fetch = fetch;
  }

  async call<T>({ method, url, body, fetchOptions }: IHttpFactory): Promise<T> {
    return this.$fetch<T>(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    });
  }
}

export default HttpFactory;
