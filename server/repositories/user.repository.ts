import { USER_SELECT } from './queries/selects';

class UserRepository {
  private userModel = prisma.user;

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findFirst({
      where: { id: id },
      select: USER_SELECT
    });

    if (!user) return null;

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findFirst({
      where: { username: username },
      select: USER_SELECT
    });

    if (!user) return null;

    return user;
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
}

export default UserRepository;
