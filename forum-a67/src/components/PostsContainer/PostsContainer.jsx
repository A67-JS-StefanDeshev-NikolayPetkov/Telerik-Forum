import PostPreview from "../PostPreview/PostPreview";
import "./PostsContainer.css";

function PostsContainer({ title, posts, onDelete }) {
  return (
    <div className="post-container">
      <h2>{title}</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostPreview
            post={post}
            key={post.id}
            commentCount={post.commentCount}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default PostsContainer;
