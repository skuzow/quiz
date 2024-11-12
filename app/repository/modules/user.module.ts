import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';
import type { User } from '@prisma/client';

class UserModule extends FetchFactory {
  private readonly ROUTE = Routes.User;

  async get(username: string) {
    return this.call<User>({
      method: 'GET',
      url: this.ROUTE.FetchUsername(username)
    });
  }

  async update(id: string, dto: User) {
    return this.call<User>({
      method: 'PUT',
      url: this.ROUTE.FetchId(id),
      body: dto,
      fetchOptions: {
        headers: {
          ...this.bearerAccessToken()
        }
      }
    });
  }

  async delete(id: string) {
    return this.call<User>({
      method: 'DELETE',
      url: this.ROUTE.FetchId(id),
      fetchOptions: {
        headers: {
          ...this.bearerAccessToken()
        }
      }
    });
  }
}

export default UserModule;
