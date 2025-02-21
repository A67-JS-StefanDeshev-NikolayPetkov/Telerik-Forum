import { useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faEdit, faThumbsDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import "./WholePostView.css";

const WholePostView = ({ title, body, comments, likes, onLike, onComment, onEdit, author, currentUser }) => {
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
        <div className="whole-post-view">
            <PostPreview
                author={author}
                title={title}
                body={body}
                likes={likes}
                comments={comments}
                isContentExpanded={isContentExpanded}
                toggleContentVisibility={toggleContentVisibility}
                createdOn={Date.now()}
            />
            {isContentExpanded && 
            <>
            <div className="post-utility">
                <SubmitButton className='submit' label={<FontAwesomeIcon icon={isLiked ? faThumbsDown : faThumbsUp} />} onClick={handleLikeClick} />
                <SubmitButton className='submit' label={<FontAwesomeIcon icon={faComment} />} onClick={onComment} />
                {isAuthor && <SubmitButton className='submit' label={<FontAwesomeIcon icon={faEdit} />} onClick={onEdit} />}
            </div>
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>
                            {comment ? (expandedComments[index] ? comment : `${comment.substring(0, 10)}...`) : "No comment"}
                            <span onClick={() => toggleCommentVisibility(index)} className="toggle-comment">
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
                    </div>
                ))}
            </div>
            </>}
        </div>
    );
};

export default WholePostView;