/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from 'bcrypt';

import type { ISignup, ILogin, IAuthUser } from '~~/shared/types/auth.type';

import { ROLE } from '~/constants/seed';
import { AUTH_USER_SELECT } from './queries/selects';

class AuthRepository {
  private userModel = prisma.user;

  async checkEmail(email: string): Promise<boolean> {
    return !!(await this.userModel.findFirst({
      where: { email: email }
    }));
  }

  async checkUsername(username: string): Promise<boolean> {
    return !!(await this.userModel.findFirst({
      where: { username: username }
    }));
  }

  async signup({
    email,
    username,
    password
  }: ISignup): Promise<IAuthUser | null> {
    // TODO: check if signup schema is valid

    const authUser = await this.userModel.create({
      data: {
        email: email,
        username: username,
        password: await this.hashPassword(password),
        roles: {
          create: [{ role: { connect: { name: ROLE.USER } } }]
        }
      },
      select: AUTH_USER_SELECT
    });

    if (!authUser) return null;

    return this.transformAuthUser(authUser);
  }

  async login({ email, password }: ILogin): Promise<IAuthUser | null> {
    const authUser = await this.userModel.findFirst({
      where: {
        email: email
      },
      select: AUTH_USER_SELECT
    });

    if (!authUser) return null;

    const isPasswordMatch: boolean = await this.comparePassword(
      password,
      authUser.password
    );

    if (!isPasswordMatch) return null;

    return this.transformAuthUser(authUser);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    storedHashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, storedHashedPassword);
  }

  private transformAuthUser(authUser: any): IAuthUser {
    return {
      ...authUser,
      password: undefined,
      roles: authUser.roles.map((role: any) => role.role.name)
    } as IAuthUser;
  }
}

export default AuthRepository;
