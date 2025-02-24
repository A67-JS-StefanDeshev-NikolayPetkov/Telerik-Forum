import "./ViewComments.css";
import Comment from "../../Comment/Comment";

function ViewComments({ comments, onDelete, onUpdate }) {
  return (
    <div className="comments-container">
      {comments.length ? (
        comments.map((comment) => (
          <Comment
            key={comment[0]}
            comment={{ ...comment[1] }}
            commentId={comment[0]}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default ViewComments;
