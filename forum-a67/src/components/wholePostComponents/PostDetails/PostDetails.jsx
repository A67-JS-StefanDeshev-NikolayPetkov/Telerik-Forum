import DislikeButton from "../../buttons/DislikeButton/DislikeButton";
import LikeButton from "../../buttons/LikeButton/LikeButton";
import EditButton from "../../buttons/EditButton/EditButton";

function PostDetails({
  post,
  handleDislike,
  handleLike,
  currentUserLike,
  isAuthor,
}) {
  return (
    <>
      <p>{post.author}</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {post.likeCount || 0}</span>
        <span>Comments: {0}</span>
      </p>

      <div className="post-buttons">
        {currentUserLike ? (
          <DislikeButton handleDislike={handleDislike}></DislikeButton>
        ) : (
          <LikeButton handleLike={handleLike}></LikeButton>
        )}

        {isAuthor && (
          <EditButton
            handleEdit={() => console.log("handle edit")}
          ></EditButton>
        )}
      </div>
    </>
  );
}

export default PostDetails;
