import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class TestModule extends FetchFactory {
  private readonly ROUTE = Routes.Test;

  async getById(id: string) {
    return this.call<{ test: IUserTest }>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getAll(page: number, search?: string) {
    return this.call<{ tests: IUserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.Fetch(),
      fetchOptions: {
        params: { page, search }
      }
    });
  }

  async getAllById(id: string, page: number, search?: string) {
    return this.call<{ tests: IUserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.FetchUserId(id),
      fetchOptions: {
        params: { page, search }
      }
    });
  }

  async getAllByUsername(username: string, page: number, search?: string) {
    return this.call<{ tests: IUserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.FetchUserUsername(username),
      fetchOptions: {
        params: { page, search }
      }
    });
  }

  async view(id: string) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.View(id)
    });
  }

  async create(test: IUserTest) {
    return this.call<{ test: IUserTest }>({
      method: 'POST',
      url: this.ROUTE.Fetch(),
      body: { test }
    });
  }

  async generate(dto: ITestGeneration) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.FetchAI(),
      body: dto
    });
  }

  async update(id: string, test: IUserTest) {
    return this.call<{ test: IUserTest }>({
      method: 'PUT',
      url: this.ROUTE.FetchId(id),
      body: { test }
    });
  }

  async delete(id: string) {
    return this.call({
      method: 'DELETE',
      url: this.ROUTE.FetchId(id)
    });
  }
}

export default TestModule;
