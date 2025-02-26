import PostPreview from "../PostPreview/PostPreview";
import "./PostsContainer.css";

function PostsContainer({ title, posts, handleScroll }) {
  return (
    <div className="post-container">
      <h2>{title}</h2>
      <div
        className="posts-container"
        onScroll={handleScroll}
        style={{ overflowY: "auto", height: "80vh" }}
      >
        {posts.length > 0 ? (
          posts.map((post) => {
            // console.log(post);
            return (
              <PostPreview
                post={post}
                key={post.id}
                commentCount={post.commentCount}
              />
            );
          })
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default PostsContainer;
