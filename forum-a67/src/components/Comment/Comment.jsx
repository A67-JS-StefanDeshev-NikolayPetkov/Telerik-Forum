import "./Comment.css";

function Comment({ comment }) {
  return (
    <div className="commentContainer">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-timestamp">
        {new Date(comment.createdOn).toLocaleDateString()}
      </p>
      <p></p>
    </div>
  );
}

export default Comment;
