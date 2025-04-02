import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { username, twoFactor } from 'better-auth/plugins';
import type { User } from '@prisma/client';

import prisma from './prisma';

import { ImageFolder } from '../constants/image.constant';
import {
  USER_USERNAME_MIN,
  USER_USERNAME_MAX
} from '../../shared/constants/user.constant';

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
    sendVerificationEmail: async ({ user, url }, _request) => {
      await email.sendVerificationEmail(user, url);
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, _request) => {
      await email.sendResetPassword(user, url);
    }
  },
  account: {
    accountLinking: {
      enabled: true
    }
  },
  user: {
    additionalFields: {
      profileImage: {
        type: 'string',
        required: false,
        defaultValue: null
      }
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url },
        _request
      ) => {
        await email.sendChangeEmailVerification(user, newEmail, url);
      }
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }, _request) => {
        await email.sendDeleteAccountVerification(user, url);
      },
      beforeDelete: async (user, _request) => {
        if (user.image) await image.remove(user.id, ImageFolder.USER_IMAGE);

        if ((user as User).profileImage)
          await image.remove(user.id, ImageFolder.USER_PROFILE_IMAGE);

        const tests = await repository.test.findAllIdById(user.id);

        if (!tests) return;

        tests.forEach(
          async ({ id }) => await image.remove(id, ImageFolder.TEST)
        );
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
