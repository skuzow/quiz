import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { username, twoFactor } from 'better-auth/plugins';

import prisma from './prisma';

import {
  USER_USERNAME_MIN,
  USER_USERNAME_MAX
} from '#shared/constants/user.constant';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET
} = process.env;

export const auth = betterAuth({
  appName: 'skuzow/quiz',
  database: prismaAdapter(prisma, {
    provider: 'sqlite'
  }),
  plugins: [
    username({
      minUsernameLength: USER_USERNAME_MIN,
      maxUsernameLength: USER_USERNAME_MAX
    }),
    twoFactor()
  ],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }, _request) =>
      email.sendVerificationEmail(user, url)
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, _request) => {
      email.sendResetPassword(user, url);
    }
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }, _request) => {
        email.sendDeleteAccountVerification(user, url);
      }
    }
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string
    },
    github: {
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string
    }
  }
});
