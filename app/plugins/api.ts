import AuthModule from '@/repository/modules/auth.module';
import TestModule from '@/repository/modules/test.module';
import UserModule from '@/repository/modules/user.module';

export interface ApiInstance {
  auth: AuthModule;
  test: TestModule;
  user: UserModule;
}

export default defineNuxtPlugin(() => {
  const originURL: string = useRequestURL().origin;

  const apiFetcher = $fetch.create({
    baseURL: originURL
  });

  const authModule = new AuthModule(apiFetcher);
  const testModule = new TestModule(apiFetcher);
  const userModule = new UserModule(apiFetcher);

  const modules: ApiInstance = {
    auth: authModule,
    test: testModule,
    user: userModule
  };

  return {
    provide: {
      api: modules
    }
  };
});
