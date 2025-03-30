/* eslint-disable @typescript-eslint/no-explicit-any */
class AuthRepository {
  private userModel = prisma.user;

  async getSession(headers: any) {
    return auth.api.getSession({ headers });
  }

  async checkEmail(email: string): Promise<boolean> {
    return !!(await this.userModel.findUnique({
      where: { email: email.toLowerCase() }
    }));
  }

  async checkUsername(username: string): Promise<boolean> {
    return !!(await this.userModel.findUnique({
      where: { username: username.toLowerCase() }
    }));
  }
}

export default AuthRepository;
