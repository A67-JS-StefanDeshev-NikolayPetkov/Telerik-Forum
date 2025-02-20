import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PostContainer from "../../components/PostsContainer/PostContainer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import "./Home.css";
import IndividualPost from "../../components/IndividualPost/IndividualPost";

function Home() {
  const { user } = useContext(AppContext);

  const post = {
    title: "Sample Post Title",
    content: "This is the content of the post.",
    comments: ["Great post!", "Thanks for sharing.", "Interesting read."],
    likes: 33,
    author: "author@example.com" // Примерен автор
  };

  const handleLike = () => {
    console.log("Liked!");
  };

  const handleComment = () => {
    console.log("Commented!");
  };

  const handleEdit = () => {
    console.log("Edited!");
  };

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
      <article>
      <div className="posts">
        <IndividualPost 
          title={post.title}
          content={post.content}
          comments={post.comments}
          likes={post.likes}
          onLike={handleLike}
          onComment={handleComment}
          onEdit={handleEdit}
          author={post.author}
          currentUser={user.email}
        />
      </div>
      <div className="posts">
        <IndividualPost 
          title={post.title}
          content={post.content}
          comments={post.comments}
          likes={post.likes}
          onLike={handleLike}
          onComment={handleComment}
          onEdit={handleEdit}
          author='nikolaytsenkovpetkov@gmail.com'
          currentUser={user.email}
        />
      </div>
      </article>
      }
    </>
  );
}

export default Home;