export interface ISignup {
  email: string;
  username: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthUser {
  email: string;
  username: string;
  image: Buffer<ArrayBufferLike> | null;
  roles: string[];
  createdAt: Date;
}
