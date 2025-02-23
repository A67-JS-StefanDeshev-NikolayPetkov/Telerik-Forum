import "./Comment.css";

function Comment({ comment, onClick }) {
  return (
    <div
      className="commentContainer"
      onClick={() => onClick(comment.postID)}
    >
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
