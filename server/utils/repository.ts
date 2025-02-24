import AuthRepository from '~~/server/repositories/auth.repository';
import TestRepository from '~~/server/repositories/test.repository';
import UserRepository from '~~/server/repositories/user.repository';

export interface RepositoryInstance {
  auth: AuthRepository;
  test: TestRepository;
  user: UserRepository;
}

const authRepository = new AuthRepository();
const testRepository = new TestRepository();
const userRepository = new UserRepository();

const repositories: RepositoryInstance = {
  auth: authRepository,
  test: testRepository,
  user: userRepository
};

const repository = repositories;

export default repository;
