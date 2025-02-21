import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import PostContainer from "../../components/PostsContainer/PostContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import IndividualPost from "../../components/IndividualPost/IndividualPost";
import { getAllPosts } from "../../services/users.service";
import "./Home.css";

function Home() {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      console.log(fetchedPosts);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="home-container">
        <WelcomeSection />
      </div>
      {!user ? (
        <div className="posts logout">
          <PostContainer title="trending" />
          <PostContainer title="recent" />
        </div>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <IndividualPost
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              comments={post.comments}
              likes={post.likes}
              author={post.author}
              currentUser={user.email}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
