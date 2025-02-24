import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class UserModule extends FetchFactory {
  private readonly ROUTE = Routes.User;

  async getById(id: string) {
    return this.call<{ user: IUser }>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getByUsername(username: string) {
    return this.call<{ user: IUser }>({
      method: 'GET',
      url: this.ROUTE.FetchUsername(username)
    });
  }

  async update(id: string, dto: IUser) {
    return this.call<{ user: IUser }>({
      method: 'PUT',
      url: this.ROUTE.FetchId(id),
      body: dto
    });
  }

  async delete(id: string) {
    return this.call({
      method: 'DELETE',
      url: this.ROUTE.FetchId(id)
    });
  }
}

export default UserModule;
