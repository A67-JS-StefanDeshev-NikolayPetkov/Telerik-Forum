import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import "./PostPreview.css";

const PostPreview = ({ author, title, content, likes, comments, isContentExpanded, toggleContentVisibility }) => {
    return (
        <div className="post-preview">
            <h4>Author: {author}</h4>
            <h3>{title}</h3>
            <p>
                {content ? (isContentExpanded ? content : `${content.substring(0, 10)}...`) : <h4>No content</h4>}
                {content && 
                <span onClick={toggleContentVisibility} className="toggle-content">
                    {isContentExpanded ? (
                        <>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </>
                    )}
                </span>}
            </p>
            {content && 
            <p>
                <span>Likes: {likes ? likes : 0}</span><span>Comments: {comments ? comments.length : 0}</span>
            </p>}
        </div>
    );
};

export default PostPreview;