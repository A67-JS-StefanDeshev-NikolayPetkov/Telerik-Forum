import "./ViewComments.css";
import Comment from "../../Comment/Comment";

function ViewComments({ comments, commentCount, onDelete, onUpdate }) {
  return (
    <div className="comments-container">
      {comments.length ? (
        comments.map((comment) => (
          <Comment
            key={comment[0]}
            comment={{ ...comment[1], id: comment[0] }}
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
