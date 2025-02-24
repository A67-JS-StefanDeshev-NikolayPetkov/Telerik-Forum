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
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        commentCount={commentCount}
        setCurrentUserLike={setCurrentUserLike}
      ></PostDetails>
      <CreateComment
        postId={postId}
        username={user.displayName}
        setComments={setComments}
        setCommentCount={setCommentCount}
        setCurrentUserLike={setCurrentUserLike}
      ></CreateComment>
      <ViewComments comments={comments}></ViewComments>
    </div>
  );
};

export default WholePostView;
