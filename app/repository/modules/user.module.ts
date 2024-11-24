import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class UserModule extends FetchFactory {
  private readonly ROUTE = Routes.User;

  async get(id: string) {
    return this.call<IUser>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getByUsername(username: string) {
    return this.call<IUser>({
      method: 'GET',
      url: this.ROUTE.FetchUsername(username)
    });
  }

  async update(id: string, dto: IUser) {
    return this.call<IUser>({
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
    return this.call({
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
