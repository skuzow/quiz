import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class TestModule extends FetchFactory {
  private readonly ROUTE = Routes.Test;

  async getById(id: string): Promise<IUserTest> {
    return this.call<IUserTest>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getAll(page: number): Promise<IUserTestPartial[]> {
    return this.call<IUserTestPartial[]>({
      method: 'GET',
      url: this.ROUTE.Fetch(),
      fetchOptions: {
        params: { page }
      }
    });
  }

  async getAllById(id: string, page: number): Promise<IUserTestPartial[]> {
    return this.call<IUserTestPartial[]>({
      method: 'GET',
      url: this.ROUTE.FetchUserId(id),
      fetchOptions: {
        params: { page }
      }
    });
  }

  async getAllByUsername(
    username: string,
    page: number
  ): Promise<IUserTestPartial[]> {
    return this.call<IUserTestPartial[]>({
      method: 'GET',
      url: this.ROUTE.FetchUserUsername(username),
      fetchOptions: {
        params: { page }
      }
    });
  }

  async view(id: string) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.View(id)
    });
  }

  async create(dto: IUserTest): Promise<IUserTest> {
    return this.call<IUserTest>({
      method: 'POST',
      url: this.ROUTE.Fetch(),
      body: { test: dto }
    });
  }

  async createWithAI(dto: IUserTestAI) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.FetchAI(),
      body: dto
    });
  }

  async update(id: string, dto: IUserTest): Promise<IUserTest> {
    return this.call<IUserTest>({
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

export default TestModule;
