import "./ViewComments.css";
import Comment from "../../Comment/Comment";

function ViewComments({ comments, commentCount }) {
  return (
    <div className="comments-container">
      {comments.length ? (
        comments.map((comment) => {
          return (
            <Comment
              key={comment[0]}
              comment={comment[1]}
            ></Comment>
          );
        })
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default ViewComments;
