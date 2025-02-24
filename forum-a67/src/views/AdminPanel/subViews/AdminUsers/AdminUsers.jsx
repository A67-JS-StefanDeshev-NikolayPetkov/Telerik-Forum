//Misc imports
import "./AdminUsers.css";

//Dependency imports
import { useEffect, useState } from "react";

//Components imports

//Services

function AdminUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {}, []);

  if (!users) return <p>No users</p>;

  return (
    <div>
      {/* {users.length > 0 ? (
        users.map((user) => (
          <UserPreview
            user={user}
            key={user.id}
            commentCount={user.commentCount}
          />
        ))
      ) : (
        <p>No users available</p>
      )} */}
    </div>
  );
}

export default AdminUsers;
