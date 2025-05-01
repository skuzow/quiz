import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class TestModule extends FetchFactory {
  private readonly ROUTE = Routes.Test;

  async getById(id: string) {
    return this.call<{ test: UserTest }>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getAll(dto: TestSearch) {
    return this.call<{ tests: UserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.Fetch(),
      fetchOptions: {
        params: dto
      }
    });
  }

  async getAllById(id: string, dto: TestSearch) {
    return this.call<{ tests: UserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.FetchUserId(id),
      fetchOptions: {
        params: dto
      }
    });
  }

  async getAllByUsername(username: string, dto: TestSearch) {
    return this.call<{ tests: UserTestPartial[] }>({
      method: 'GET',
      url: this.ROUTE.FetchUserUsername(username),
      fetchOptions: {
        params: dto
      }
    });
  }

  async complete(id: string, dto: TestCompletion) {
    return this.call({
      method: 'POST',
      url: this.ROUTE.Complete(id),
      fetchOptions: {
        body: dto
      }
    });
  }

  async create(test: TestCreation) {
    return this.call<{ test: UserTest }>({
      method: 'POST',
      url: this.ROUTE.Fetch(),
      body: { test }
    });
  }

  async generate(dto: TestGeneration) {
    return this.call<{ test: TestCreation }>({
      method: 'POST',
      url: this.ROUTE.FetchAI(),
      body: dto
    });
  }

  async update(id: string, test: TestCreation) {
    return this.call<{ test: UserTest }>({
      method: 'PUT',
      url: this.ROUTE.FetchId(id),
      body: { test }
    });
  }

  async updateImage(id: string, imageFormData: FormData) {
    return this.call<{ image: string }>({
      method: 'PUT',
      url: this.ROUTE.FetchIdImage(id),
      body: imageFormData,
      fetchOptions: {
        headers: {}
      }
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
