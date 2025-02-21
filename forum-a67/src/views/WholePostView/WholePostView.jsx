import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostPreview from "../../components/PostPreview/PostPreview";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEdit,
  faThumbsDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./WholePostView.css";
import {
  postComment,
  getCommentCountByPost,
  likePost,
  unlikePost,
  isPostLikedByUser,
  getPostById,
} from "../../services/users.service";

const WholePostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [author, setAuthor] = useState("");
  const [currentUser, setCurrentUser] = useState(""); // Replace with actual current user logic

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await getPostById(postId);
      setPost(postData);
      setLikeCount(postData.likes);
      setAuthor(postData.author);
    };

    const fetchCommentCount = async () => {
      const count = await getCommentCountByPost(postId);
      setCommentCount(count);
    };

    const checkIfLiked = async () => {
      const liked = await isPostLikedByUser(postId, currentUser);
      setIsLiked(liked);
    };

    fetchPostData();
    fetchCommentCount();
    checkIfLiked();
  }, [postId, currentUser]);

  const handleLikeClick = async () => {
    if (isLiked) {
      await unlikePost(postId, currentUser);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      await likePost(postId, currentUser);
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const toggleContentVisibility = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  const toggleCommentVisibility = (index) => {
    setExpandedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      await postComment(postId, currentUser, newComment);
      setNewComment("");
      const count = await getCommentCountByPost(postId);
      setCommentCount(count);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="whole-post-view">
      <PostPreview
        author={author}
        title={post.title}
        body={post.body}
        likes={likeCount}
        comments={post.comments}
        commentCount={commentCount}
        isContentExpanded={isContentExpanded}
        toggleContentVisibility={toggleContentVisibility}
        createdOn={post.createdOn}
      />
      {post.body ? (
        <p>
          {isContentExpanded ? post.body : `${post.body.substring(0, 10)}...`}
          <span onClick={toggleContentVisibility} className="toggle-content">
            {isContentExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </span>
        </p>
      ) : (
        <p>No posts</p>
      )}
      {isContentExpanded && (
        <>
          <div className="post-utility">
            <SubmitButton
              className="submit"
              label={
                <FontAwesomeIcon icon={isLiked ? faThumbsDown : faThumbsUp} />
              }
              onClick={handleLikeClick}
            />
            {author === currentUser && (
              <SubmitButton
                className="submit"
                label={<FontAwesomeIcon icon={faEdit} />}
                onClick={() => {}}
              />
            )}
          </div>
          <div className="comments-section">
            <h4>Comments ({commentCount})</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>
                    {expandedComments[index]
                      ? comment
                      : `${comment.substring(0, 10)}...`}
                    <span
                      onClick={() => toggleCommentVisibility(index)}
                      className="toggle-comment"
                    >
                      {expandedComments[index] ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                    </span>
                  </p>
                  {expandedComments[index] && (
                    <div className="nested-comments">
                      {comment.replies && comment.replies.length > 0 ? (
                        comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="nested-comment">
                            <p>{reply}</p>
                          </div>
                        ))
                      ) : (
                        <p>No replies</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments</p>
            )}
            <div className="new-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <SubmitButton
                className="submit"
                label="Submit"
                onClick={handleCommentSubmit}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WholePostView;
