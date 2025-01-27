/* eslint-disable @typescript-eslint/no-explicit-any */
class AuthRepository {
  private userModel = prisma.user;

  async checkSession(headers: any) {
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw {
        statusCode: 401,
        statusMessage: 'Unauthorized'
      };
    }

    return session;
  }

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
