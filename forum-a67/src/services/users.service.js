import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  push,
  remove,
  limitToLast
} from "firebase/database";
import { db } from "../config/firebase-config";

////////////////////////////////////////////////////////////

//Used in Register.jsx
export const createUserHandle = (
  username,
  uid,
  email,
  firstName,
  lastName,
  number
) => {
  return set(ref(db, `users/${username}`), {
    createdOn: Date.now(),
    email,
    firstName,
    lastName,
    number,
    uid,
    admin: false,
  });
};

//Used in Register.jsx
export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

////////////////////////////////////////////////////////////

//Used in Home.jsx
export const getAllPosts = async () => {
  const snapshot = await get(
    query(ref(db, `posts`), orderByChild("createdOn"))
  );
  if (!snapshot.exists()) return [];
  const snapshotVal = snapshot.val();
  return Object.keys(snapshotVal).map((key) => ({
    ...snapshotVal[key],
    id: key,
  }));
};

//Used in Home -> WelcomeSection.jsx
export const getUserCount = async () => {
  const snapshot = await get(ref(db, "users"));
  if (snapshot.exists()) {
    const users = snapshot.val();
    return Object.keys(users).length;
  } else {
    return 0;
  }
};

//Used in Home -> WelcomeSection.jsx
export const getPostCount = async () => {
  const snapshot = await get(ref(db, "posts"));
  if (snapshot.exists()) {
    const posts = snapshot.val();
    return Object.keys(posts).length;
  } else {
    return 0;
  }
};

////////////////////////////////////////////////////////////

//Used in CreatePost.jsx
export const createPostHandle = (title, body, author) => {
  const newPostRef = push(ref(db, "posts"));
  return set(newPostRef, {
    id: newPostRef.key,
    title,
    author,
    body,
    createdOn: Date.now(),
    commentCount: 0,
    likeCount: 0,
  });
};

export const updatePostHandle = (post, postId) => {
  const postRef = ref(db, `posts/${postId}`);
  return set(postRef, { ...post });
};

////////////////////////////////////////////////////////////

//Used in Profile.jsx
export const getPostsByAuthor = async (author) => {
  const snapshot = await get(
    query(ref(db, `posts`), orderByChild("author"), equalTo(author))
  );

  if (!snapshot.exists()) return [];

  const snapshotVal = snapshot.val();

  const posts = Object.keys(snapshotVal).map((key) => {
    const post = snapshotVal[key];

    return { ...post };
  });

  return posts;
};

////////////////////////////////////////////////////////////

//Used in AppContext
export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

////////////////////////////////////////////////////////////

//Used in WholePostView.jsx
export const getPostById = async (postId) => {
  const postRef = ref(db, `posts/${postId}`);
  const snapshot = await get(postRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error("Post not found.");
  }
};

//Used in WholePostView.jsx
export const likePost = async (postId, userId) => {
  //Adds current user to list of people that have liked this post
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  await set(postLikesRef, true);

  //Increases the like count within the post itself
  const postRef = ref(db, `posts/${postId}`);
  const postSnapshot = await get(postRef);
  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const likeCount = post.likeCount ? post.likeCount + 1 : 1;
    await set(postRef, { ...post, likeCount });
  }
};

//Used in WholePostView.jsx
export const unlikePost = async (postId, userId) => {
  //Removes current user from list of people that have liked this post
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  await remove(postLikesRef);

  //Decreases the like count in the post itself
  const postRef = ref(db, `posts/${postId}`);
  const postSnapshot = await get(postRef);
  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const likeCount = post.likeCount ? post.likeCount - 1 : 0;
    await set(postRef, { ...post, likeCount });
  }
};

//Used in WholePostView.jsx
export const isPostLikedByUser = async (postId, userId) => {
  //Checks if the user has liked this post
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  const snapshot = await get(postLikesRef);
  return snapshot.exists();
};

//Used in WholePostView.jsx
export const postComment = async (postId, author, comment) => {
  const commentsRef = ref(db, `comments`);
  const newCommentRef = push(commentsRef);
  await set(newCommentRef, {
    postID: postId,
    author: author,
    body: comment,
    createdOn: Date.now(),
  });

  const postRef = ref(db, `posts/${postId}`);
  const postSnapshot = await get(postRef);
  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const commentCount = post.commentCount ? post.commentCount + 1 : 1;
    await set(postRef, { ...post, commentCount });
  }
};

//Used in WholePostView.jsx
export const getCommentsByPost = async (postId) => {
  const snapshot = await get(
    query(ref(db, "comments"), orderByChild("postID"), equalTo(postId))
  );
  if (snapshot.exists()) {
    const comments = snapshot.val();
    return comments;
  } else {
    return 0;
  }
};

//Used in Home.jsx
export const getNewPosts = async () => {
  const snapshot = await get(query(ref(db, `posts`), orderByChild("createdOn"), limitToLast(10)));
  if (!snapshot.exists()) return [];
  const snapshotVal = snapshot.val();
  const posts = Object.keys(snapshotVal).map((key) => ({ ...snapshotVal[key], id: key }));
  return posts.reverse();
};