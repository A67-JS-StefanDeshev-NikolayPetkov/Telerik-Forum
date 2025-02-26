import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  push,
  remove,
  limitToFirst,
  update,
  startAfter,
  limitToLast,
  startAt,
  endAt,
  endBefore,
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

export const updateUserHandle = (userDetails) => {
  try {
    const postRef = ref(db, `users/${userDetails.username}`);
    return set(postRef, { ...userDetails });
  } catch (e) {
    throw new Error(e.message);
  }
};

//Used in Register.jsx
export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getUserDataByHandle = async (handle) => {
  try {
    const snapshot = await get(ref(db, `users/${handle}`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error({ message: "No such user" });
    }
  } catch (e) {
    throw new Error({ message: "No such user" });
  }
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

//Used in Home.jsx
export const getNewPosts = async () => {
  const snapshot = await get(
    query(ref(db, `posts`), orderByChild("createdOn"), limitToLast(10))
  );
  if (!snapshot.exists()) return [];
  const snapshotVal = snapshot.val();
  const posts = Object.keys(snapshotVal).map((key) => ({
    ...snapshotVal[key],
    id: key,
  }));
  return posts.reverse();
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

export const updatePostHandle = async (post, postId) => {
  const postRef = ref(db, `posts/${postId}`);

  try {
    const result = await set(postRef, { ...post });
    return result;
  } catch (error) {
    return error;
  }
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

// Add a function to remove a post ID from tags
const removePostIdFromTags = async (postId, tags) => {
  for (const tag of tags) {
    const tagRef = ref(db, `tags/${tag.toLowerCase()}`);
    const snapshot = await get(tagRef);
    if (snapshot.exists()) {
      const tagData = snapshot.val();
      const postIds = tagData.postIds || [];
      const updatedPostIds = postIds.filter((id) => id !== postId);
      if (updatedPostIds.length === 0) {
        // If no posts are associated with the tag, delete the tag
        await remove(tagRef);
      } else {
        // Otherwise, update the tag with the remaining post IDs
        await update(tagRef, { postIds: updatedPostIds });
      }
    }
  }
};

//Used in PostPreview (to move to) -> WholePostView.jsx
export const deletePost = async (postId) => {
  const postRef = ref(db, `posts/${postId}`);
  const likeRef = ref(db, `postLikes/${postId}`);
  // const commentRef = ref(db, `comments`);
  const postSnapshot = await get(postRef);

  if (postSnapshot.exists()) {
    const post = postSnapshot.val();
    const tags = post.tags || [];

    try {
      await Promise.all([
        remove(postRef),
        remove(likeRef),
        removePostIdFromTags(postId, tags),
        deleteCommentsByPost(postId),
      ]);
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const deleteCommentsByPost = async (postId) => {
  const snapshot = await get(
    query(ref(db, "comments"), orderByChild("postID"), equalTo(postId))
  );

  if (snapshot.exists()) {
    const refsAndValue = {};
    snapshot.forEach((snap) => {
      refsAndValue[`/comments/${snap.key}`] = null;
    });

    await update(ref(db), refsAndValue);
  }
};

//Used in ProfileComments.jsx
export const getCommentsByAuthor = async (author) => {
  try {
    const snapshot = await get(
      query(ref(db, "comments"), orderByChild("author"), equalTo(author))
    );
    if (snapshot.exists()) {
      const comments = snapshot.val();

      return comments;
    } else {
      return 0;
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Add the deleteComment function
export const deleteComment = async (commentId, postId) => {
  try {
    const commentRef = ref(db, `comments/${commentId}`);
    await remove(commentRef);

    //Decreases the comment count in the post itself
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.val();
      const commentCount = post.commentCount ? post.commentCount - 1 : 0;
      await set(postRef, { ...post, commentCount });
    }
  } catch (e) {
    throw new Error(e);
  }
};

// Add the updateComment function
export const updateComment = async (commentId, updatedComment) => {
  const commentRef = ref(db, `comments/${commentId}`);
  await set(commentRef, updatedComment);
};

// Add the searchPosts function
export const searchPosts = async (queryText) => {
  try {
    const snapshot = await get(ref(db, "posts"));
    if (snapshot.exists()) {
      const posts = snapshot.val();
      const postList = Object.keys(posts).map((key) => ({
        id: key,
        ...posts[key],
      }));
      const filteredPosts = postList.filter((post) =>
        post.title.toLowerCase().includes(queryText.toLowerCase())
      );
      return filteredPosts;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
    //Used in Admin Panel
  }
};

//Can be reworked to combine with the above function and be flexible in many different cases. Must rework admin users to work with object that contains username and data in the same object, not as Object.entries() and then rework this function to omit the two search types
export const searchUsers = async (searchBy = "username", searchValue) => {
  try {
    const snapshot = await get(ref(db, "users"));
    if (snapshot.exists()) {
      const users = snapshot.val();

      let filteredUsers;

      if (searchBy === "username") {
        filteredUsers = Object.entries(users).filter((user) => {
          console.log("username", user);
          return user[0].toLowerCase().includes(searchValue.toLowerCase());
        });
      } else {
        filteredUsers = Object.entries(users).filter((user) => {
          console.log("else", user);
          return user[1][searchBy]
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });
      }

      console.log(filteredUsers);

      return filteredUsers;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {object} latestElement provide the last rendered object so that firebase can retrieve the next 10
 * @param {string} whatToGet the name of the firebase document we want e.g. users, posts, comments etc
 * @param {string} orderBy the parameter by which we wish to order what we want to get e.g. createdOn
 * @param {number} howManyToGet how many to fetch
 * @param {boolean} ascending true if you wish to get elements in ascending and false to get in descending order
 * @returns
 */
export const fetchForInfiniteScroll = async (
  latestElement = null,
  whatToGet,
  orderBy,
  howManyToGet,
  ascending = true
) => {
  try {
    let queryResult;

    queryResult = query(
      ref(db, whatToGet),
      orderByChild(orderBy),
      ascending ? limitToFirst(howManyToGet) : limitToLast(howManyToGet)
    );

    // If there's a previous last loaded user, fetch after that user's 'createdOn'
    if (latestElement) {
      queryResult = query(
        ref(db, whatToGet),
        orderByChild(orderBy),
        ascending
          ? startAfter(latestElement[orderBy])
          : endBefore(latestElement[orderBy]),
        ascending ? limitToFirst(howManyToGet) : limitToLast(howManyToGet)
      );
    }

    //Sort the whatToGet locally again since firebase messes up for some reason
    const snapshot = await get(queryResult);
    if (!snapshot.exists()) return [];
    const snapshotVal = snapshot.val();

    const sortedUsers = ascending
      ? Object.entries(snapshotVal).sort(
          (a, b) => a[1][orderBy] - b[1][orderBy]
        )
      : Object.entries(snapshotVal).sort(
          (a, b) => b[1][orderBy] - a[1][orderBy]
        );

    return sortedUsers;
  } catch (e) {
    console.error(`Error fetching ${whatToGet}:`, e);
    throw new Error(e);
  }
};

export const updateUserDetails = async (username, updatedUser) => {
  const userRef = ref(db, `users/${username}`);
  await set(userRef, updatedUser);
};

// Add a function to add a tag to the tags collection
export const addTag = async (tag, postId) => {
  const tagRef = ref(db, `tags/${tag.toLowerCase()}`);
  try {
    const snapshot = await get(tagRef);
    if (snapshot.exists()) {
      // If the tag already exists, update the postIds array
      const tagData = snapshot.val();
      const postIds = tagData.postIds || [];
      if (!postIds.includes(postId)) {
        postIds.push(postId);
        await update(tagRef, { postIds });
      }
    } else {
      // If the tag does not exist, create it with the postId
      await set(tagRef, { name: tag.toLowerCase(), postIds: [postId] });
    }
  } catch (error) {
    return error;
  }
};

// Add a function to remove a post ID from a tag
export const removePostIdFromTag = async (tag, postId) => {
  const tagRef = ref(db, `tags/${tag.toLowerCase()}`);
  try {
    const snapshot = await get(tagRef);
    if (snapshot.exists()) {
      const tagData = snapshot.val();
      const postIds = tagData.postIds || [];
      const updatedPostIds = postIds.filter((id) => id !== postId);
      if (updatedPostIds.length === 0) {
        // If no posts are associated with the tag, delete the tag
        await remove(tagRef);
      } else {
        // Otherwise, update the tag with the remaining post IDs
        await update(tagRef, { postIds: updatedPostIds });
      }
    }
  } catch (error) {
    return error;
  }
};
