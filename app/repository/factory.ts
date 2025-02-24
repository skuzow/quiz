import type {
  $Fetch,
  NitroFetchOptions,
  NitroFetchRequest,
  TypedInternalResponse
} from 'nitropack';

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

  async call<T>({
    method,
    url,
    body,
    fetchOptions
  }: IHttpFactory): Promise<TypedInternalResponse<NitroFetchRequest, T>> {
    const locale = useCookie('i18n_redirected');

    return this.$fetch<T>(url, {
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
