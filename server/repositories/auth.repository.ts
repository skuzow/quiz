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
}

export default AuthRepository;
