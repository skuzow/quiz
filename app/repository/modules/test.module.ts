import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';
import type { UserTest } from '@prisma/client';

class TestModule extends FetchFactory {
  private readonly ROUTE = Routes.Test;

  async getAll() {
    return this.call<UserTest[]>({
      method: 'GET',
      url: this.ROUTE.Fetch()
    });
  }

  async get(id: string) {
    return this.call<UserTest>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async view(id: string) {
    return this.call<UserTest>({
      method: 'POST',
      url: this.ROUTE.View(id)
    });
  }

  async create(dto: UserTest) {
    return this.call<UserTest>({
      method: 'POST',
      url: this.ROUTE.Fetch(),
      body: dto,
      fetchOptions: {
        headers: {
          ...this.bearerAccessToken()
        }
      }
    });
  }

  async update(id: string, dto: UserTest) {
    return this.call<UserTest>({
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
    return this.call<UserTest>({
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

export default TestModule;
