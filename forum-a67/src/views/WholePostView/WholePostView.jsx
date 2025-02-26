//Dependancy imports
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

//Components imports
import Loader from "../../components/loader/Loader";
import PostDetails from "../../components/wholePostComponents/PostDetails/PostDetails";
import CreateComment from "../../components/wholePostComponents/CreateComment/CreateComment";
import ViewComments from "../../components/wholePostComponents/ViewComments/ViewComments";

//Misc imports
import "./WholePostView.css";

//Services imports
import {
  getPostById,
  isPostLikedByUser,
  getCommentsByPost,
  deleteComment,
  updateComment,
  updatePostHandle, // Add this import
} from "../../services/users.service";

const WholePostView = () => {
  //Context
  const { user, userData } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostData = async () => {
    try {
      const [postData, isLiked, comments] = await Promise.all([
        getPostById(postId),
        isPostLikedByUser(postId, user.displayName),
        getCommentsByPost(postId),
      ]);
      setPost(postData);
      setCurrentUserLike(isLiked);
      setComments(Object.entries(comments));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async function () {
      try {
        await fetchPostData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, postId);
      setComments((prevComments) =>
        prevComments.filter(([id]) => id !== commentId)
      );

      // Update the comment count in the post object
      const updatedPost = { ...post, commentCount: post.commentCount - 1 };
      setPost(updatedPost);

      // Save the updated post to the database
      await updatePostHandle(updatedPost, postId);
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdateComment = async (commentId, newComment) => {
    try {
      await updateComment(commentId, {
        ...newComment,
      });
      setComments((prevComments) =>
        prevComments.map(([id, comment]) =>
          id === commentId ? [id, { ...newComment }] : [id, comment]
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  if (loading) return <Loader />;

  const isAuthor = post.author === user.displayName;

  return (
    <div className="whole-post-view">
      <PostDetails
        postId={postId}
        post={post}
        setPost={setPost}
        currentUserLike={currentUserLike}
        isAuthor={isAuthor}
        commentCount={post.commentCount}
        setCurrentUserLike={setCurrentUserLike}
        userData={userData}
      ></PostDetails>
      {!userData?.blocked && (
        <CreateComment
          post={post}
          postId={postId}
          username={user.displayName}
          setComments={setComments}
          setCurrentUserLike={setCurrentUserLike}
        />
      )}
      <ViewComments
        comments={comments}
        commentCount={post.commentCount}
        onDelete={handleDeleteComment}
        onUpdate={handleUpdateComment}
      />
    </div>
  );
};

export default WholePostView;
