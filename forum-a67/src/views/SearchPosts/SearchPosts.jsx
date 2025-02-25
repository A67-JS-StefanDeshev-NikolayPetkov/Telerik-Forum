//Dependancy imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [hasResults, setHasResults] = useState(false);
  const navigate = useNavigate();

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
      setHasResults(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const handleBack = () => {
    navigate("/"); // Navigate to the home view
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
      {hasResults && (
        <SubmitButton
          label="To Home"
          onClick={handleBack}
          className="back-button"
        />
      )}
    </div>
  );
}

export default SearchPosts;
