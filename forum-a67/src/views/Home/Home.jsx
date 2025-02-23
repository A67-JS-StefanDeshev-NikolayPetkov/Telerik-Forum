import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Loader from "../../components/loader/Loader";
import { getAllPosts, getNewPosts } from "../../services/users.service";
import "./Home.css";

function Home() {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [fetchedPosts, fetchedNewPosts] = await Promise.all([
          getAllPosts(),
          getNewPosts(),
        ]);
        setPosts(fetchedPosts);
        setNewPosts(fetchedNewPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="home-container">
        <WelcomeSection />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="posts">
          {!user ? (
            <>
              <PostsContainer title="trending" posts={posts} />
              <PostsContainer title="recent" posts={posts} />
            </>
          ) : (
            <PostsContainer title="Newest Posts" posts={newPosts} />
          )}
        </div>
      )}
    </>
  );
}

export default Home;
