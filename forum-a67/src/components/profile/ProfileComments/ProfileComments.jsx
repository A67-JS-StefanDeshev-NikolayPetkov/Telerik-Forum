//Misc imports
import "./ProfileComments.css";

//Dependency imports
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { getCommentsByAuthor } from "../../../services/users.service";

//Component imports
import Loader from "../../loader/Loader";
import Comment from "../../Comment/Comment";

function ProfileComments() {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCommentsByAuthor(user.displayName)
      .then((comments) => {
        setComments(Object.entries(comments));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const redirectToWholePostView = function (postId) {
    return navigate(`/post/${postId}`);
  };

  if (loading) return <Loader></Loader>;

  if (error) return <p>error</p>;

  if (!comments) return <p>No comments yet.</p>;

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment[0]}
          onClick={() => redirectToWholePostView(comment[1].postID)}
          comment={comment[1]}
        ></Comment>
      ))}
    </>
  );
}

export default ProfileComments;
