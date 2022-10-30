export interface User {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  online: boolean;
  password: string;
  birthdate: Date;
  createdAt: string;
  changedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  replayToUserId: string | undefined;
  body: string;
}

export interface Post {
  id: string;
  userId: string;
  header: string;
  body: string;
}

export interface DB {
  users: User[];
  posts: Post[];
  comments: Comment[];
}
