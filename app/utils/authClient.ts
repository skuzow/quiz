import { createAuthClient } from 'better-auth/vue';
import { usernameClient, twoFactorClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    twoFactorClient({
      twoFactorPage: '/two-factor'
    })
  ]
});

export default authClient;
