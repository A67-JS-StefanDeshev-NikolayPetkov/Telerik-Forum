//Misc imports
import "./ProfilePosts.css";

//Dependency imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

//Component imports
import Loader from "../../loader/loader";
import IndividualPost from "../../IndividualPost/IndividualPost";

function ProfilePosts({ posts }) {
  const { user, userData } = useContext(AppContext);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return !posts ? (
    <Loader></Loader>
  ) : (
    posts.map((post) => (
      <>
        <p>Title: {post.title}</p>
        <p>Body: {post.body}</p>
        <p>Author: {post.author}</p>
        <p>Created on: {post.createdOn}</p>
      </>
    ))
  );
}

export default ProfilePosts;
