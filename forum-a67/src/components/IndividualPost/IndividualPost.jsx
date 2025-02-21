import WholePostView from "../../views/WholePostView/WholePostView";
import "./IndividualPost.css";

const IndividualPost = (props) => {
    return (
        <WholePostView {...props} postId={props.postId} />
    );
};

export default IndividualPost;