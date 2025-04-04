export interface UserPartial {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string | null;
  displayUsername: string | null;
  image: string | null;
  profileImage: string | null;
  createdAt: Date;
}
