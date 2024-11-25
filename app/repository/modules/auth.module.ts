import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';
import type { CheckResponse } from '~~/shared/types/response.type';

class AuthModule extends FetchFactory {
  private readonly ROUTE = Routes.Auth;

  async checkEmail(email: string): Promise<CheckResponse> {
    return this.call<CheckResponse>({
      method: 'POST',
      url: this.ROUTE.CheckEmail(),
      body: { email }
    });
  }

  async checkUsername(username: string): Promise<CheckResponse> {
    return this.call<CheckResponse>({
      method: 'POST',
      url: this.ROUTE.CheckUsername(),
      body: { username }
    });
  }

  async signupWithEmail(dto: ISignup) {
    return authClient.signUp.email({
      email: dto.email,
      name: dto.name,
      password: dto.password,
      username: dto.username
    });
  }
}

export default AuthModule;
