import { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./IndividualPost.css";

const IndividualPost = ({ title, content, comments, likes, onLike, onComment, onEdit, author, currentUser }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});
    const isAuthor = author === currentUser;

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

    return (
        <div className="individual-post">
            <h3>{title}</h3>
            <p>
                {isContentExpanded ? content : `${content.substring(0, 10)}...`}
                <span onClick={toggleContentVisibility} className="toggle-content">
                    {isContentExpanded ? "Show Less" : "Show More"}
                </span>
            </p>
            {isContentExpanded && 
            <>
            <p>
                <strong>Author:</strong> {author}
            </p>
            <p>
                Likes: {likes}
            </p>
            <p>
                Comments: {comments.length}
            </p>
            <div className="post-utility">
                <SubmitButton className='submit' label={isLiked ? 'Unlike' : 'Like'} onClick={handleLikeClick} />
                <SubmitButton className='submit' label='Comment' onClick={onComment} />
                {isAuthor && <SubmitButton className='submit' label='Edit' onClick={onEdit} />}
            </div>
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>
                            {expandedComments[index] ? comment : `${comment.substring(0, 10)}...`}
                            <span onClick={() => toggleCommentVisibility(index)} className="toggle-comment">
                                {expandedComments[index] ? " Show Less" : " Show More"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            </>}
        </div>
    );
};

export default IndividualPost;