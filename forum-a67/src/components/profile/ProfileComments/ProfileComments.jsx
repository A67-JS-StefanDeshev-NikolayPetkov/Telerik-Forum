//Misc imports
import "./ProfileComments.css";

//Dependency imports
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getCommentsByAuthor } from "../../../services/users.service";

//Component imports
import Loader from "../../loader/Loader";
import Comment from "../../Comment/Comment";

function ProfileComments() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(0);
  const [error, setError] = useState(null);
  const { username } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCommentsByAuthor(username)
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

  if (comments.length < 1) return <p>No comments yet.</p>;

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
