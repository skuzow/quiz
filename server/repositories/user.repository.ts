/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from '~~/shared/types/user.type';

import { USER_SELECT } from './queries/selects';

class UserRepository {
  private userModel = prisma.user;

  async findById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findFirst({
      where: { id: id },
      select: USER_SELECT
    });

    if (!user) return null;

    return this.transformUser(user);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await this.userModel.findFirst({
      where: { username: username },
      select: USER_SELECT
    });

    if (!user) return null;

    return this.transformUser(user);
  }

  private transformUser(user: any): IUser {
    return {
      ...user,
      roles: user.roles.map((role: any) => role.role.name),
      tests: user.tests.map((test: any) => ({
        ...test,
        categories: test.categories.map(
          (category: any) => category.category.name
        ),
        views: test._count.views,
        _count: undefined
      }))
    };
  }
}

export default UserRepository;
