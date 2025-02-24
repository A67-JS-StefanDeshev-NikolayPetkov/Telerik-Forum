//Misc imports
import "./AdminPanel.css";

//Dependency imports
import { AppContext } from "../../../context/AppContext";

//Components imports
import ViewContainer from "../../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../../components/containers/StandardCard/StandardCard";
import AdminUsers from "../subViews/AdminUsers/AdminUsers";

//Services

function AdminPanel() {
  const { user, userData } = useContext(AppContext);

  //If not logged in or not an admin deny access
  if (!user || !userData.admin) return <p>Access denied.</p>;

  return (
    <ViewContainer>
      <h2>Admin Panel</h2>

      <StandardCard>
        <h3>Users</h3>
        <AdminUsers users></AdminUsers>
      </StandardCard>
    </ViewContainer>
  );
}

export default AdminPanel;
