import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class AuthModule extends FetchFactory {
  private readonly ROUTE = Routes.Auth;

  async checkEmail(email: string) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.CheckEmail(),
      body: { email }
    });
  }

  async checkUsername(username: string) {
    return this.call({
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
