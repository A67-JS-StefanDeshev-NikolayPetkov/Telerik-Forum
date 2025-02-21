import { useEffect, useState } from "react";
import PostPreview from "../PostPreview/PostPreview";
import { getAllPosts } from "../../services/users.service";
import "./PostContainer.css";

function PostContainer({ title }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts);
    });
  }, []);

  return (
    <div className="post-container">
      <h2>{title}</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            body={post.body}
            author={post.author}
            createdOn={post.createdOn}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default PostContainer;
