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
    FetchIdImage: (id: string) => `${PREFIX.USER}/${id}/image`,
    FetchIdProfileImage: (id: string) => `${PREFIX.USER}/${id}/profile-image`,
    FetchUsername: (username: string) => `${PREFIX.USER}/username/${username}`
  },
  Test: {
    Fetch: () => PREFIX.TEST,
    FetchId: (id: string) => `${PREFIX.TEST}/${id}`,
    FetchUserId: (id: string) => `${PREFIX.TEST}/users/${id}`,
    FetchUserUsername: (username: string) =>
      `${PREFIX.TEST}/users/username/${username}`,
    FetchAI: () => `${PREFIX.TEST}/ai`,
    Complete: (id: string) => `${PREFIX.TEST}/${id}/complete`
  }
};

export default Routes;
