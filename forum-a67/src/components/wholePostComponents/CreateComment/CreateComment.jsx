import SubmitButton from "../../SubmitButton/SubmitButton";

import "./CreateComment.css";

import { useState } from "react";
import { postComment } from "../../../services/users.service";

function CreateComment({ postId, username, commentCount, setCommentCount }) {
  const [commentData, setCommentData] = useState("");

  const handleCommentSubmit = async () => {
    if (commentData.trim()) {
      await postComment(postId, username, commentData);
      setCommentData("");
      setCommentCount(commentCount + 1);
    }
  };

  return (
    <div className="new-comment">
      <textarea
        className="comment-input"
        type="text"
        value={commentData}
        onChange={(e) => setCommentData(e.target.value)}
        placeholder="Write a comment..."
      />
      <SubmitButton
        className="submit"
        label="Submit"
        onClick={handleCommentSubmit}
      />
    </div>
  );
}

export default CreateComment;
