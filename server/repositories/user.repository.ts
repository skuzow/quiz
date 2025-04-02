/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_SELECT } from './queries/selects';

class UserRepository {
  private userModel = prisma.user;

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findFirst({
      where: { id: id },
      select: USER_SELECT
    });

    if (!user) return null;

    return this.transformUser(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findFirst({
      where: { username: username },
      select: USER_SELECT
    });

    if (!user) return null;

    return this.transformUser(user);
  }

  async updateImage(id: string, image: string): Promise<string | null> {
    const user = await this.userModel.update({
      where: { id },
      data: { image },
      select: { image: true }
    });

    return user.image;
  }

  async updateProfileImage(
    id: string,
    profileImage: string
  ): Promise<string | null> {
    const user = await this.userModel.update({
      where: { id },
      data: { profileImage },
      select: { profileImage: true }
    });

    return user.profileImage;
  }

  private transformUser(user: any): User {
    return {
      ...user,
      roles: user.roles.map((role: any) => role.role.name)
    };
  }
}

export default UserRepository;
