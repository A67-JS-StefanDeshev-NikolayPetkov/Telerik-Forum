import { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./IndividualPost.css";

const IndividualPost = ({ title, content, comments, likes, onLike, onComment, onEdit, author, currentUser }) => {
    const [isLiked, setIsLiked] = useState(false);
    const isAuthor = author === currentUser;

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        onLike();
    };

    return (
        <div className="individual-post">
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="post-utility">
                <SubmitButton className='submit' label={isLiked ? 'Unlike' : 'Like'} onClick={handleLikeClick} />
                <p>Likes: {likes}</p>
                <SubmitButton className='submit' label='Comment' onClick={onComment} />
                {isAuthor && <SubmitButton className='submit' label='Edit' onClick={onEdit} />}
            </div>
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndividualPost;