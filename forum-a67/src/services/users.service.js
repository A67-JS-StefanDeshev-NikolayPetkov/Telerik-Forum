// import {
//   get,
//   set,
//   ref,
//   query,
//   equalTo,
//   orderByChild,
//   push,
// } from "firebase/database";
// import { db } from "../config/firebase-config";

// export const getUserByHandle = (handle) => {
//   return get(ref(db, `users/${handle}`));
// };

// export const getPostsByAuthor = async (author) => {
//   const snapshot = await get(
//     query(ref(db, `posts`), orderByChild("author"), equalTo(author))
//   );

//   if (!snapshot.exists()) return [];

//   const snapshotVal = snapshot.val();

//   const posts = Object.keys(snapshotVal).map((key) => {
//     const post = snapshotVal[key];

//     return { ...post };
//   });

//   return posts;
// };

// export const getAllPosts = async () => {
//   const snapshot = await get(
//     query(ref(db, `posts`), orderByChild("createdOn"))
//   );

//   if (!snapshot.exists()) return [];

//   const snapshotVal = snapshot.val();

//   const posts = Object.keys(snapshotVal).map((key) => {
//     const post = snapshotVal[key];
//     return { ...post, id: key };
//   });

//   return posts;
// };

// export const getPostsByTopic = (topic) => {
//   return get(ref(db, `posts/${topic}`));
// };

// export const getCommentsByAuthor = (author) => {
//   return get(ref(db, `comments/${author}`));
// };

// export const getCommentsByPost = (post) => {
//   return get(ref(db, `comments/${post}`));
// };

// export const getUserCount = async () => {
//   const snapshot = await get(ref(db, "users"));
//   if (snapshot.exists()) {
//     const users = snapshot.val();
//     return Object.keys(users).length;
//   } else {
//     return 0;
//   }
// };

// export const getPostCount = async () => {
//   const snapshot = await get(ref(db, "posts"));
//   if (snapshot.exists()) {
//     const posts = snapshot.val();
//     return Object.keys(posts).length;
//   } else {
//     return 0;
//   }
// };

// export const getCommentCountByPost = async (postId) => {
//   const snapshot = await get(
//     query(ref(db, "comments"), orderByChild("postID"), equalTo(postId))
//   );
//   if (snapshot.exists()) {
//     const comments = snapshot.val();
//     return Object.keys(comments).length;
//   } else {
//     return 0;
//   }
// };
// export const createPostHandle = (title, body, author) => {
//   const newPostPath = push(ref(db, "posts"));

//   return set(newPostPath, {
//     id: newPostPath.key,
//     title,
//     author: author,
//     body,
//     createdOn: Date.now(),
//     comments: {},
//     likes: {},
//   });
// };

// export const createUserHandle = (
//   username,
//   uid,
//   email,
//   firstName,
//   lastName,
//   number
// ) => {
//   return set(ref(db, `users/${username}`), {
//     username,
//     uid,
//     email,
//     firstName,
//     lastName,
//     number,
//     createdOn: Date.now(),
//     posts: {},
//     likedPosts: {},
//   });
// };

// export const getUserData = (uid) => {
//   return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
// };

// export const postComment = async (postId, author, comment) => {
//   const commentsRef = ref(db, `comments`);
//   const newCommentRef = push(commentsRef);
//   await set(newCommentRef, {
//     postID: postId,
//     author: author,
//     body: comment,
//     createdOn: Date.now(),
//   });

//   const postRef = ref(db, `posts/${postId}`);
//   const postSnapshot = await get(postRef);
//   if (postSnapshot.exists()) {
//     const post = postSnapshot.val();
//     const commentCount = post.commentCount ? post.commentCount + 1 : 1;
//     await set(postRef, { ...post, commentCount });
//   }
// };
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

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

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

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

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

export const getCommentCountByPost = async (postId) => {
  const snapshot = await get(
    query(ref(db, "comments"), orderByChild("postID"), equalTo(postId))
  );
  if (snapshot.exists()) {
    const comments = snapshot.val();
    return Object.keys(comments).length;
  } else {
    return 0;
  }
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

export const likePost = async (postId, userId) => {
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  await set(postLikesRef, true);

  const postRef = ref(db, `posts/${postId}`);
  const postSnapshot = await get(postRef);
  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const likeCount = post.likeCount ? post.likeCount + 1 : 1;
    await set(postRef, { ...post, likeCount });
  }
};

export const unlikePost = async (postId, userId) => {
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  await remove(postLikesRef);

  const postRef = ref(db, `posts/${postId}`);
  const postSnapshot = await get(postRef);
  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const likeCount = post.likeCount ? post.likeCount - 1 : 0;
    await set(postRef, { ...post, likeCount });
  }
};

export const isPostLikedByUser = async (postId, userId) => {
  const postLikesRef = ref(db, `postLikes/${postId}/${userId}`);
  const snapshot = await get(postLikesRef);
  return snapshot.exists();
};
