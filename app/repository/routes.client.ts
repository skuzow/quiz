const API_PREFIX: string = '/api';

const PREFIX = {
  AUTH: `${API_PREFIX}/auth`,
  USER: `${API_PREFIX}/users`,
  TEST: `${API_PREFIX}/tests`
};

const Routes = {
  Auth: {
    CheckEmail: () => `${PREFIX.AUTH}/check-email`,
    CheckUsername: () => `${PREFIX.AUTH}/check-username`
  },
  User: {
    FetchId: (id: string) => `${PREFIX.USER}/${id}`,
    FetchUsername: (username: string) => `${PREFIX.USER}/username/${username}`
  },
  Test: {
    Fetch: () => PREFIX.TEST,
    FetchId: (id: string) => `${PREFIX.TEST}/${id}`,
    FetchAI: () => `${PREFIX.TEST}/ai`,
    View: (id: string) => `${PREFIX.TEST}/${id}/view`
  }
};

export default Routes;
