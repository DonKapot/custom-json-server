import { faker } from "@faker-js/faker";
import { getRandomNumberInRange } from "./utils";
import { Comment, DB, Post, User } from "./types";

const db: DB = {
  users: [],
  posts: [],
  comments: [],
};

const createUser = (id: string) =>
  ({
    id,
    userName: faker.internet.userName(),
    displayName: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    bio: `${faker.lorem.text()} ${faker.internet.emoji()}`,
    online: faker.datatype.boolean(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    createdAt: new Date().toISOString(),
    changedAt: new Date().toISOString(),
  } as User);

const createPost = (id: string, userId: string) =>
  ({
    id,
    userId,
    header: faker.lorem.words(10),
    body: faker.lorem.text(),
  } as Post);

const createComment = (
  postId: string,
  userId: string,
  replayToUserId?: string | undefined
) =>
  ({
    id: faker.datatype.uuid(),
    userId,
    postId,
    body: faker.lorem.paragraph(),
    replayToUserId,
  } as Comment);

const createPosts = (
  userId: string,
  minPostsPerUser: number,
  maxPostsPerUser: number,
  minCommentsPerPost: number,
  maxCommentsPerPost: number
) => {
  for (
    let i = 0;
    i < getRandomNumberInRange(minPostsPerUser, maxPostsPerUser);
    i++
  ) {
    const postId = faker.datatype.uuid();
    db.posts.push(createPost(postId, userId));
    createComments(postId, userId, minCommentsPerPost, maxCommentsPerPost);
  }
};

const createComments = (
  postId: string,
  userId: string,
  minCommentsPerPost: number,
  maxCommentsPerPost: number
) => {
  for (
    let i = 0;
    i < getRandomNumberInRange(minCommentsPerPost, maxCommentsPerPost);
    i++
  ) {
    const commentId = faker.datatype.uuid();
    db.comments.push(createComment(postId, userId));
  }
};

export const createDb = (
  {
    minUserCount,
    maxUserCount,
    minPostsPerUser,
    maxPostsPerUser,
    minCommentsPerPost,
    maxCommentsPerPost,
  } = {
    minUserCount: 100,
    maxUserCount: 1000,
    minPostsPerUser: 0,
    maxPostsPerUser: 5,
    minCommentsPerPost: 0,
    maxCommentsPerPost: 5,
  }
) => {
  for (let i = 0; i < getRandomNumberInRange(minUserCount, maxUserCount); i++) {
    const userId = faker.datatype.uuid() as string;
    db.users.push(createUser(userId));
    createPosts(
      userId,
      minPostsPerUser,
      maxPostsPerUser,
      minCommentsPerPost,
      maxCommentsPerPost
    );
  }
  return db;
};
