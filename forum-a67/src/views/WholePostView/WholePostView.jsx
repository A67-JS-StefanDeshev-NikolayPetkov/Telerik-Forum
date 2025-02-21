import { useState, useEffect } from "react";
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
} from "../../services/users.service";

const WholePostView = ({
  title,
  body,
  comments,
  likes,
  onLike,
  onComment = () => {}, // Default to an empty function if not provided
  onEdit,
  author,
  currentUser,
  postId, // Add postId prop to identify the post
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const isAuthor = author === currentUser;

  useEffect(() => {
    const fetchCommentCount = async () => {
      const count = await getCommentCountByPost(postId);
      setCommentCount(count);
    };

    fetchCommentCount();
  }, [postId]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLike();
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
      await postComment(postId, newComment);
      onComment(newComment);
      setNewComment("");
      // Update comment count after submitting a new comment
      const count = await getCommentCountByPost(postId);
      setCommentCount(count);
    }
  };

  return (
    <div className="whole-post-view">
      <p>{author}</p>
      <h2>{title}</h2>
      <p>{body}</p>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {likes ? likes : 0}</span>
        <span>Comments: {0}</span>
      </p>

      <div className="post-utility">
        <SubmitButton
          className="submit"
          label={<FontAwesomeIcon icon={isLiked ? faThumbsDown : faThumbsUp} />}
          onClick={handleLikeClick}
        />
        {isAuthor && (
          <SubmitButton
            className="submit"
            label={<FontAwesomeIcon icon={faEdit} />}
            onClick={onEdit}
          />
        )}
      </div>

      <div className="comments-section">
        <h4>Comments ({commentCount})</h4>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="comment"
            >
              <p>
                {expandedComments[index]
                  ? comment
                  : `${comment.substring(0, 10)}...`}
                <span
                  onClick={() => toggleCommentVisibility(index)}
                  className="toggle-comment"
                >
                  {expandedComments[index] ? (
                    <>
                      <FontAwesomeIcon icon={faChevronUp} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </>
                  )}
                </span>
              </p>
              {expandedComments[index] && (
                <div className="nested-comments">
                  {comment.replies && comment.replies.length > 0 ? (
                    comment.replies.map((reply, replyIndex) => (
                      <div
                        key={replyIndex}
                        className="nested-comment"
                      >
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
    </div>
  );
};

export default WholePostView;
