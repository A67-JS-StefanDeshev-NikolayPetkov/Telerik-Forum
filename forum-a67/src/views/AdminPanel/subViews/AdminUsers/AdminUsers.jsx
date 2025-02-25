//Misc imports
import "./AdminUsers.css";

//Dependency imports

//Components imports
import UserPreview from "../../../../components/UserPreview/UserPreview";
//Services

function AdminUsers({ users, handleScroll }) {
  if (!users) return <p>No users</p>;

  return (
    <div
      onScroll={handleScroll}
      style={{ overflowY: "auto", height: "80vh" }}
    >
      {users.length > 0 ? (
        users.map(([username, userData]) => (
          <UserPreview
            username={username}
            userData={userData}
            key={username}
            commentCount={userData.commentCount}
          />
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}

export default AdminUsers;
