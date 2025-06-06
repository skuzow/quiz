import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class AuthModule extends FetchFactory {
  private readonly ROUTE = Routes.Auth;

  async checkEmail(email: string) {
    return this.call<{ isAvailable: boolean }>({
      method: 'POST',
      url: this.ROUTE.CheckEmail(),
      body: { email } as AuthEmailCheck
    });
  }

  async checkUsername(username: string) {
    return this.call<{ isAvailable: boolean }>({
      method: 'POST',
      url: this.ROUTE.CheckUsername(),
      body: { username } as AuthUsernameCheck
    });
  }
}

export default AuthModule;
