import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3000/users")
      .then((response) => {
        console.log("API Response:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  let navigate = useNavigate();
  return (
    <div className="card">
      <h2>
        <button className="button-back" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        User List
      </h2>
      {users.map((user) => (
        <Link className="button-list" to={`/users/${user.id}`}>
          {user.name}
        </Link>
      ))}
    </div>
  );
};

export default UserList;
