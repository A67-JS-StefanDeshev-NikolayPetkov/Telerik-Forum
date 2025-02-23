//Dependency imports
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

//Component imports
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
  likePost,
  unlikePost,
  getCommentsByPost,
} from "../../services/users.service";

const WholePostView = () => {
  //Context
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ////////////////////
  //Get initial data
  ////////////////////

  ////////////////////
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

  ////////////////////

  ////////////////////
  //Handle like/dislike
  ////////////////////

  ////////////////////
  const handleLike = async function () {
    setCurrentUserLike(true);
    post.likeCount = post.likeCount + 1 || 1;

    try {
      await likePost(postId, user.displayName);
    } catch (error) {
      setCurrentUserLike(true);
      post.likeCount--;
    }
  };

  const handleDislike = async function () {
    setCurrentUserLike(false);
    post.likeCount = post.likeCount - 1;

    try {
      await unlikePost(postId, user.displayName);
    } catch {
      setCurrentUserLike(true);
      post.likeCount++;
    }
  };

  ////////////////////

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  //If getting
  if (loading) {
    return <Loader />;
  }

  //Editorial rights
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
      ></PostDetails>
      <CreateComment
        postId={postId}
        username={user.displayName}
        setComments={setComments}
        setCommentCount={setCommentCount}
      ></CreateComment>
      <ViewComments comments={comments}></ViewComments>
    </div>
  );
};

export default WholePostView;
