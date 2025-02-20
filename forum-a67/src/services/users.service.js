import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  push,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getPostsByAuthor = (author) => {
  return get(ref(db, `posts/${author}`));
};

export const getPostsByTopic = (topic) => {
  return get(ref(db, `posts/${topic}`));
};

export const getCommentsByAuthor = (author) => {
  return get(ref(db, `comments/${author}`));
};

export const getCommentsByPost = (post) => {
  return get(ref(db, `comments/${post}`));
};

export const getUserCount = async () => {
  const snapshot = await get(ref(db, "users"));
  if (snapshot.exists()) {
    const users = snapshot.val();
    return Object.keys(users).length;
  } else {
    return 0;
  }
};

export const getPostCount = async () => {
  const snapshot = await get(ref(db, "posts"));
  if (snapshot.exists()) {
    const posts = snapshot.val();
    return Object.keys(posts).length;
  } else {
    return 0;
  }
};

export const createPostHandle = (title, body, author) => {
  const newPostPath = push(ref(db, "posts"));

  return set(newPostPath, {
    id: newPostPath.key,
    title,
    author: author,
    body,
    createdOn: Date.now(),
    comments: {},
    likes: {},
  });
};

export const createUserHandle = (
  username,
  uid,
  email,
  firstName,
  lastName,
  number
) => {
  return set(ref(db, `users/${username}`), {
    username,
    uid,
    email,
    firstName,
    lastName,
    number,
    createdOn: Date.now(),
    posts: {},
    likedPosts: {},
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};
