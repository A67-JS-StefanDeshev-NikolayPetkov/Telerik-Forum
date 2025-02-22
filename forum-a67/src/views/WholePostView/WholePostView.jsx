//Dependency imports
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

//Component imports
import Loader from "../../components/loader/Loader";
import PostDetails from "../../components/wholePostComponents/PostDetails/PostDetails";
import CreateComment from "../../components/wholePostComponents/CreateComment/CreateComment";

//Misc imports
import "./WholePostView.css";

//Services imports
import {
  getPostById,
  isPostLikedByUser,
  likePost,
  unlikePost,
  getCommentCountByPost,
} from "../../services/users.service";

const WholePostView = () => {
  //Context
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ////////////////////
  //Get initial data
  ////////////////////

  ////////////////////
  useEffect(() => {
    const fetchData = async function () {
      try {
        await fetchPostData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPostData = async () => {
    try {
      const [postData, isLiked, commentCount] = await Promise.all([
        getPostById(postId),
        isPostLikedByUser(postId, user.displayName),
        getCommentCountByPost(postId),
      ]);
      setPost(postData);
      setCurrentUserLike(isLiked);
      setCommentCount(commentCount);
    } catch (error) {
      setError(error);
    }
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
        postId={postId}
        post={post}
        setPost={setPost}
        handleDislike={handleDislike}
        handleLike={handleLike}
        currentUserLike={currentUserLike}
        isAuthor={isAuthor}
        commentCount={commentCount}
      ></PostDetails>
      <CreateComment
        postId={postId}
        username={user.displayName}
        setCommentCount={setCommentCount}
        commentCount={commentCount}
      ></CreateComment>
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
//
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default WholePostView;
