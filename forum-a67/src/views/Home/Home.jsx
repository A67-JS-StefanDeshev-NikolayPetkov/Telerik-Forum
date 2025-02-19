import PostContainer from "../../components/PostsContainer/PostContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import "./Home.css";

function Home() {
  return (
    <>
    <div className="home-container">
      <WelcomeSection />
    </div>
    <div className='posts'>
        <PostContainer title='trending' />
        <PostContainer title='recent'/>
    </div>
    </>
  );
}

export default Home;
