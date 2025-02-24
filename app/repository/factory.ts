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
    const { locale } = useI18n();

    return this.$fetch<T>(url, {
      method,
      body,
      headers: {
        'Accept-Language': locale.value,
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    });
  }
}

export default HttpFactory;
