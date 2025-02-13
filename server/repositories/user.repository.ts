/* eslint-disable @typescript-eslint/no-explicit-any */
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
      roles: user.roles.map((role: any) => role.role.name)
    };
  }
}

export default UserRepository;
