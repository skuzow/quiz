import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class AuthModule extends FetchFactory {
  private readonly ROUTE = Routes.Auth;

  async checkEmail(email: string): Promise<ICheckResponse> {
    return this.call<ICheckResponse>({
      method: 'POST',
      url: this.ROUTE.CheckEmail(),
      body: { email }
    });
  }

  async checkUsername(username: string): Promise<ICheckResponse> {
    return this.call<ICheckResponse>({
      method: 'POST',
      url: this.ROUTE.CheckUsername(),
      body: { username }
    });
  }
}

export default AuthModule;
