import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { jwt, bearer, username, twoFactor } from 'better-auth/plugins';

import prisma from './prisma';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET
} = process.env;

export const auth = betterAuth({
  appName: 'skuzow/quiz',
  plugins: [jwt(), bearer(), username(), twoFactor()],
  database: prismaAdapter(prisma, {
    provider: 'sqlite'
  }),
  emailVerification: {
    sendOnSignUp: true
  },
  emailAndPassword: {
    enabled: true
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
