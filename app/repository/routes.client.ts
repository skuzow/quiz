const API_PREFIX: string = '/api';

const PREFIX = {
  AUTH: `${API_PREFIX}/auth`,
  USER: `${API_PREFIX}/users`,
  TEST: `${API_PREFIX}/tests`
};

const Routes = {
  Auth: {
    CheckEmail: (email: string) => `${PREFIX.AUTH}/check-email/${email}`,
    CheckUsername: (username: string) =>
      `${PREFIX.AUTH}/check-username/${username}`,
    Signup: () => `${PREFIX.AUTH}/signup`,
    Login: () => `${PREFIX.AUTH}/login`,
    Logout: () => `${PREFIX.AUTH}/logout`,
    Verify: () => `${PREFIX.AUTH}/verify`
  },
  User: {
    FetchUsername: (username: string) => `${PREFIX.USER}/${username}`,
    FetchId: (id: string) => `${PREFIX.USER}/${id}`
  },
  Test: {
    Fetch: () => PREFIX.TEST,
    FetchId: (id: string) => `${PREFIX.TEST}/${id}`,
    View: (id: string) => `${PREFIX.TEST}/${id}/view`
  }
};

export default Routes;
