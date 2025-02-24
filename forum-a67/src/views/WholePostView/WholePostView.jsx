//Dependancy imports
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

//Components imports
import Loader from "../../components/loader/Loader";
import PostDetails from "../../components/wholePostComponents/PostDetails/PostDetails";
import CreateComment from "../../components/wholePostComponents/CreateComment/CreateComment";
import ViewComments from "../../components/wholePostComponents/ViewComments/ViewComments";

//Services imports
import {
  getPostById,
  isPostLikedByUser,
  likePost,
  unlikePost,
  getCommentsByPost,
  deleteComment,
  updateComment,
  updatePostHandle, // Add this import
} from "../../services/users.service";

//Misc import
import "./WholePostView.css";

const WholePostView = () => {
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPostData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPostData = async () => {
    try {
      const [postData, isLiked, comments] = await Promise.all([
        getPostById(postId),
        isPostLikedByUser(postId, user.displayName),
        getCommentsByPost(postId),
      ]);
      setPost(postData);
      setCurrentUserLike(isLiked);
      setCommentCount(Object.keys(comments).length);
      setComments(Object.entries(comments));
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter(([id]) => id !== commentId)
      );
      setCommentCount((prevCount) => prevCount - 1);

      // Update the comment count in the post object
      const updatedPost = { ...post, commentCount: post.commentCount - 1 };
      setPost(updatedPost);

      // Save the updated post to the database
      await updatePostHandle(updatedPost, postId);
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdateComment = async (commentId, updatedBody) => {
    try {
      await updateComment(commentId, {
        ...comments[commentId],
        body: updatedBody,
      });
      setComments((prevComments) =>
        prevComments.map(([id, comment]) =>
          id === commentId
            ? [id, { ...comment, body: updatedBody }]
            : [id, comment]
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const handleLike = async () => {
    setCurrentUserLike(true);
    post.likeCount = post.likeCount + 1 || 1;

    try {
      await likePost(postId, user.displayName);
    } catch (error) {
      setCurrentUserLike(true);
      post.likeCount--;
    }
  };

  const handleDislike = async () => {
    setCurrentUserLike(false);
    post.likeCount = post.likeCount - 1;

    try {
      await unlikePost(postId, user.displayName);
    } catch {
      setCurrentUserLike(true);
      post.likeCount++;
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const isAuthor = post.author === user.displayName;

  return (
    <div className="whole-post-view">
      <PostDetails
        postId={postId}
        post={post}
        setPost={setPost}
        handleDislike={handleDislike}
        handleLike={handleLike}
        currentUserLike={currentUserLike}
        isAuthor={isAuthor}
        commentCount={commentCount}
      />
      <CreateComment
        post={post}
        postId={postId}
        username={user.displayName}
        setComments={setComments}
        setCommentCount={setCommentCount}
      />
      <ViewComments
        comments={comments}
        commentCount={commentCount}
        onDelete={handleDeleteComment}
        onUpdate={handleUpdateComment}
      />
    </div>
  );
};

export default WholePostView;
