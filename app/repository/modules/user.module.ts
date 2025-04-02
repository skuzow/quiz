import FetchFactory from '@/repository/factory';
import Routes from '@/repository/routes.client';

class UserModule extends FetchFactory {
  private readonly ROUTE = Routes.User;

  async getById(id: string) {
    return this.call<{ user: User }>({
      method: 'GET',
      url: this.ROUTE.FetchId(id)
    });
  }

  async getByUsername(username: string) {
    return this.call<{ user: User }>({
      method: 'GET',
      url: this.ROUTE.FetchUsername(username)
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

  async updateProfileImage(id: string, imageFormData: FormData) {
    return this.call<{ profileImage: string }>({
      method: 'PUT',
      url: this.ROUTE.FetchIdProfileImage(id),
      body: imageFormData,
      fetchOptions: {
        headers: {}
      }
    });
  }
}

export default UserModule;
