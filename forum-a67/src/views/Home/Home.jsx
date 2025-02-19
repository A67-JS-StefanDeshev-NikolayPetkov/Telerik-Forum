//Dependency imports
import { useContext } from "react";

//Context import
import { AppContext } from "../../context/AppContext";

//Component imports
import PostContainer from "../../components/PostsContainer/PostContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

//Misc imports
import "./Home.css";

function Home() {
  const { user } = useContext(AppContext);
  return (
    <>
    <div className="home-container">
      <WelcomeSection />
    </div>
    {!user ? 
    <div className='posts'>
        <PostContainer title='trending' />
        <PostContainer title='recent'/>
    </div> : 
    null
    }
    </>
  );
}

export default Home;
