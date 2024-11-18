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
  private accessToken: string = '';

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

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  clearAccessToken() {
    this.accessToken = '';
  }

  bearerAccessToken(): { Authorization: string } | Record<string, never> {
    return this.accessToken
      ? {
          Authorization: `Bearer ${this.accessToken}`
        }
      : {};
  }
}

export default HttpFactory;
