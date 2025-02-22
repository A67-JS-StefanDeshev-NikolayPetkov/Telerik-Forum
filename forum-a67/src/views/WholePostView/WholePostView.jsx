//Dependency imports
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

//Component imports
import Loader from "../../components/loader/Loader";
import PostDetails from "../../components/wholePostComponents/PostDetails/PostDetails";

//Misc imports
import "./WholePostView.css";

//Services imports
import {
  getPostById,
  isPostLikedByUser,
  likePost,
  unlikePost,
} from "../../services/users.service";

const WholePostView = () => {
  //Context
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ////////////////////
  //Get initial data
  ////////////////////

  ////////////////////
  useEffect(() => {
    const fetchData = async function () {
      try {
        await Promise.all([fetchIsLiked(), fetchPostData()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPostData = async () => {
    try {
      const postData = await getPostById(postId);
      setPost(postData);
    } catch (error) {
      setError(error);
    }
  };

  const fetchIsLiked = async () => {
    const isLiked = await isPostLikedByUser(postId, user.displayName);
    setCurrentUserLike(isLiked);
  };
  ////////////////////

  ////////////////////
  //Handle like/dislike
  ////////////////////

  ////////////////////
  const handleLike = async function () {
    setCurrentUserLike(true);
    post.likeCount = post.likeCount + 1 || 1;

    try {
      await likePost(postId, user.displayName);
    } catch (error) {
      setCurrentUserLike(true);
      post.likeCount--;
    }
  };

  const handleDislike = async function () {
    setCurrentUserLike(false);
    post.likeCount = post.likeCount - 1;

    try {
      await unlikePost(postId, user.displayName);
    } catch {
      setCurrentUserLike(true);
      post.likeCount++;
    }
  };
  ////////////////////

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  //If getting
  if (loading) {
    return <Loader />;
  }

  //Editorial rights
  const isAuthor = post.author === user.displayName;

  return (
    <div className="whole-post-view">
      <PostDetails
        post={post}
        handleDislike={handleDislike}
        handleLike={handleLike}
        currentUserLike={currentUserLike}
        isAuthor={isAuthor}
      ></PostDetails>
    </div>
  );
};

export default WholePostView;

// import {
//   postComment,
//   getCommentCountByPost,
// } from "../../services/users.service";

// const WholePostView = () => {
//   const [newComment, setNewComment] = useState("");
//   const [commentCount, setCommentCount] = useState(0);

//   useEffect(() => {

//     const fetchCommentCount = async () => {
//       const count = await getCommentCountByPost(postId);
//       setCommentCount(count);
//     };

//     fetchCommentCount();
//   }, []);

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       await postComment(postId, currentUser, newComment);
//       setNewComment("");
//       const count = await getCommentCountByPost(postId);
//       setCommentCount(count);
//     }
//   };

//   return (
//     <div className="whole-post-view">
//
//           </div>
//           <div className="comments-section">
//             <h4>Comments ({commentCount})</h4>
//             {post.comments && post.comments.length > 0 ? (
//               post.comments.map((comment, index) => (
//                 <div key={index} className="comment">
//                   <p>
//                     {expandedComments[index]
//                       ? comment
//                       : `${comment.substring(0, 10)}...`}
//                     <span
//                       onClick={() => toggleCommentVisibility(index)}
//                       className="toggle-comment"
//                     >
//                       {expandedComments[index] ? (
//                         <FontAwesomeIcon icon={faChevronUp} />
//                       ) : (
//                         <FontAwesomeIcon icon={faChevronDown} />
//                       )}
//                     </span>
//                   </p>
//                   {expandedComments[index] && (
//                     <div className="nested-comments">
//                       {comment.replies && comment.replies.length > 0 ? (
//                         comment.replies.map((reply, replyIndex) => (
//                           <div key={replyIndex} className="nested-comment">
//                             <p>{reply}</p>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No replies</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No comments</p>
//             )}
//             <div className="new-comment">
//               <input
//                 type="text"
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Write a comment..."
//               />
//               <SubmitButton
//                 className="submit"
//                 label="Submit"
//                 onClick={handleCommentSubmit}
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default WholePostView;
