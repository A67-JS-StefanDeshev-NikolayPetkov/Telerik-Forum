// //Dependancy imports
// import { useState } from "react";

// //Components imports
// import PostsContainer from "../../components/PostsContainer/PostsContainer";
// import SubmitButton from "../../components/SubmitButton/SubmitButton";
// import Loader from "../../components/loader/Loader";

// //Services imports
// import { searchPosts } from "../../services/users.service";

// //Misc imports
// import "./SearchPosts.css";

// function SearchPosts({ onSearchResults }) {
//   const [query, setQuery] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const fetchedPosts = await searchPosts(query);
//       console.log(fetchedPosts);
//       setPosts(fetchedPosts);
//       console.log(posts);
//     } catch (error) {
//       setError(error.message);
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//       setQuery("");
//     }
//   };

//   return (
//     <div className="search-posts">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Search posts..."
//           required
//         />
//         <SubmitButton label="Search" />
//       </form>
//       {loading && <Loader />}
//       {error && <div className="error">{error}</div>}
//       {posts.length > 0 && (
//         <PostsContainer title="Search Results" posts={posts} />
//       )}
//     </div>
//   );
// }

// export default SearchPosts;
//Dependancy imports
import { useState } from "react";

//Components imports
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Loader from "../../components/loader/Loader";

//Services imports
import { searchPosts } from "../../services/users.service";

//Misc imports
import "./SearchPosts.css";

function SearchPosts({ onSearchResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await searchPosts(query);
      onSearchResults(fetchedPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="search-posts">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search posts..."
          required
        />
        <SubmitButton label="Search" />
      </form>
      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default SearchPosts;
