//Dependency
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

//Components
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Loader from "../../components/loader/Loader";
import SearchPosts from "../../views/SearchPosts/SearchPosts";

//Services
import {
  getAllPosts,
  getNewPosts,
  fetchForInfiniteScroll,
} from "../../services/users.service";

//Misc
import "./Home.css";

function Home() {
  const { user } = useContext(AppContext);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [latestNewestPost, setLatestNewestPost] = useState(null);
  const [latestTrendingPost, setLatestTrendingPost] = useState(null);

  function loadNewestPosts() {
    setLoading(true);

    try {
      fetchForInfiniteScroll(
        latestNewestPost,
        "posts",
        "createdOn",
        10,
        false
      ).then((fetchedPosts) => {
        if (fetchedPosts.length > 0) {
          setNewPosts([...newPosts, ...fetchedPosts.map((post) => post[1])]);
          setLatestNewestPost(fetchedPosts[fetchedPosts.length - 1][1]);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleNewestScroll = (e) => {
    const bottom =
      e.target.scrollHeight <=
      Math.round(e.target.scrollTop + e.target.clientHeight);
    console.log(
      e.target.scrollHeight,
      e.target.scrollTop + e.target.clientHeight
    );
    if (bottom && !loading) {
      console.log("bottom");
      loadNewestPosts();
    }
  };

  function loadTrendingPosts() {
    setLoading(true);
    console.log("triggered trending", latestTrendingPost);

    try {
      fetchForInfiniteScroll(
        latestTrendingPost,
        "posts",
        "commentCount",
        10,
        false
      ).then((fetchedPosts) => {
        console.log("fetched trending", fetchedPosts);
        if (fetchedPosts.length > 0) {
          setTrendingPosts([
            ...trendingPosts,
            ...fetchedPosts.map((post) => post[1]),
          ]);
          setLatestTrendingPost(fetchedPosts[fetchedPosts.length - 1][1]);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    loadTrendingPosts();
    loadNewestPosts();
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
          <SearchPosts onSearchResults={handleSearchResults} />
          {searchResults ? (
            <PostsContainer
              title="Search Results"
              posts={searchResults}
            />
          ) : (
            <>
              {!user ? (
                <>
                  <PostsContainer
                    title="Trending"
                    posts={trendingPosts}
                  />
                  <PostsContainer
                    title="Recent"
                    posts={newPosts}
                  />
                </>
              ) : (
                <PostsContainer
                  title="Newest Posts"
                  posts={newPosts}
                  handleScroll={handleNewestScroll}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
