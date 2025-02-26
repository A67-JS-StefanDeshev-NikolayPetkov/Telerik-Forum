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

  useEffect(() => {
    loadMoreUsers();
  }, []);

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
