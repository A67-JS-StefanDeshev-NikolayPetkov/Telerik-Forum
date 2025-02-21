import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
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
          <PostsContainer title="trending" posts={posts} />
          <PostsContainer title="recent" posts={posts} />
        </div>
      ) : (
        <p>Logged in user: newest posts</p>
      )}
    </>
  );
}

export default Home;
