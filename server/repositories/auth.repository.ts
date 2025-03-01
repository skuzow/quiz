/* eslint-disable @typescript-eslint/no-explicit-any */
class AuthRepository {
  private userModel = prisma.user;

  async checkSession(headers: any) {
    const authSession = await auth.api.getSession({ headers });

    if (!authSession) {
      throw {
        statusCode: 401,
        statusMessage: 'Unauthorized'
      };
    }

    return authSession;
  }

  async getSession(headers: any) {
    return auth.api.getSession({ headers });
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
