//Misc imports
import "./AdminPanel.css";

//Dependency imports
import { AppContext } from "../../../context/AppContext";
import { useContext, useEffect, useState } from "react";

//Components imports
import ViewContainer from "../../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../../components/containers/StandardCard/StandardCard";
import AdminUsers from "../subViews/AdminUsers/AdminUsers";
import Loader from "../../../components/loader/Loader";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

//Services
import {
  fetchForInfiniteScroll,
  searchUsers,
} from "../../../services/users.service";

function AdminPanel() {
  const { user, userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [lastRenderedUser, setLastRenderedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("username");
  const [searchResult, setSearchResult] = useState([]);
  const [searchCompleted, setSearchCompleted] = useState(false);

  function loadMoreUsers() {
    if (loading) return;
    setLoading(true);

    try {
      fetchForInfiniteScroll(
        lastRenderedUser,
        "users",
        "createdOn",
        10,
        false
      ).then((newUsers) => {
        if (newUsers.length > 0) {
          setUsers([...users, ...newUsers]);
          setLastRenderedUser(newUsers[newUsers.length - 1][1]);
        }
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight <=
      Math.round(e.target.scrollTop + e.target.clientHeight + 1);
    console.log(
      e.target.scrollHeight,
      Math.round(e.target.scrollTop + e.target.clientHeight + 1)
    );
    if (bottom && !loading) {
      console.log("bottom");
      loadMoreUsers();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchCompleted(false);
    setLoading(true);

    try {
      const matchedUsers = await searchUsers(searchBy, searchValue);
      setSearchResult(matchedUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearchCompleted(true);
    }
  };

  const cancelSearch = function () {
    setSearchResult([]);
    setSearchCompleted(false);
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

  const searchBarMarkup = (
    <div className="search-users">
      {searchCompleted && <button onClick={cancelSearch}>X</button>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Enter user ${searchBy}`}
          required
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="username">username</option>
          <option value="email">email</option>
        </select>
        <SubmitButton label="Search" />
      </form>
    </div>
  );

  //If not logged in or not an admin deny access
  if (!user || !userData.admin) return <p>Access denied.</p>;

  if (loading) return <Loader></Loader>;

  if (error) return <p>{error}</p>;

  return (
    <ViewContainer>
      <h2>Admin Panel</h2>

      <div>
        <h3>Users</h3>
        {searchBarMarkup}
        <AdminUsers
          users={searchCompleted ? searchResult : users}
          handleScroll={handleScroll}
        ></AdminUsers>
      </div>
    </ViewContainer>
  );
}

export default AdminPanel;
