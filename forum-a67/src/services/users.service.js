import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
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
    createdOn: new Date(),
    posts: {},
    likedPosts: {},
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};
