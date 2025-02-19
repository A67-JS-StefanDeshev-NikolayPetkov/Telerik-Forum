import PostPreview from "../PostPreview/PostPreview"
import './PostContainer.css'

function PostContainer({ title }) {
  return (
    <div className='post-container'>
        <h2>{title}</h2>
        <PostPreview />
    </div>
  )
}

export default PostContainer