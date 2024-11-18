import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';
import type { User } from '@prisma/client';

import type { ISignup, ILogin } from '~~/shared/types/auth.type';

class AuthModule extends FetchFactory {
  private readonly ROUTE = Routes.Auth;

  async checkEmail(email: string) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.CheckEmail(email)
    });
  }

  async checkUsername(username: string) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.CheckUsername(username)
    });
  }

  async signup(dto: ISignup) {
    return this.call<User>({
      method: 'POST',
      url: this.ROUTE.Signup(),
      body: dto
    });
  }

  async login(dto: ILogin) {
    return this.call<User>({
      method: 'POST',
      url: this.ROUTE.Login(),
      body: dto
    });
  }

  async logout() {
    return this.call({
      method: 'POST',
      url: this.ROUTE.Logout(),
      fetchOptions: {
        headers: {
          ...this.bearerAccessToken()
        }
      }
    });
  }

  async verify() {
    return this.call({
      method: 'GET',
      url: this.ROUTE.Verify(),
      fetchOptions: {
        headers: {
          ...this.bearerAccessToken()
        }
      }
    });
  }
}

export default AuthModule;
