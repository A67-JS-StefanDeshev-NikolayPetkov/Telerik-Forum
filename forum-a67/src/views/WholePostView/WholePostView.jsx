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
  getCommentsByPost,
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

  useEffect(() => {
    if (!userData) return;

    const fetchData = async function () {
      try {
        await fetchPostData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

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
        currentUserLike={currentUserLike}
        isAuthor={isAuthor}
        commentCount={post.commentCount}
        setCurrentUserLike={setCurrentUserLike}
        userData={userData}
      ></PostDetails>
      <CreateComment
        post={post}
        postId={postId}
        username={user.displayName}
        setComments={setComments}
        setCurrentUserLike={setCurrentUserLike}
      ></CreateComment>
      <ViewComments comments={comments}></ViewComments>
    </div>
  );
};

export default WholePostView;
