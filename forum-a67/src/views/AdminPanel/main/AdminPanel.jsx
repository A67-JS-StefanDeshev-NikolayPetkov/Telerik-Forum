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

//Services
import { fetchForInfiniteScroll } from "../../../services/users.service";

function AdminPanel() {
  const { user, userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [lastRenderedUser, setLastRenderedUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      console.log("bottom");
      loadMoreUsers();
    }
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  //If not logged in or not an admin deny access
  if (!user || !userData.admin) return <p>Access denied.</p>;

  if (loading) return <Loader></Loader>;

  if (error) return <p>{error}</p>;

  return (
    <ViewContainer>
      <h2>Admin Panel</h2>

      <StandardCard>
        <h3>Users</h3>
        <AdminUsers
          users={users}
          handleScroll={handleScroll}
        ></AdminUsers>
      </StandardCard>
    </ViewContainer>
  );
}

export default AdminPanel;
