import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.scss";

const Home: React.FC = () => {
  return (
    <div className="card">
      <h1>Welcome to the Library Management System</h1>
      <Link className="button-secondary" to="/users">
        View Users
      </Link>
      <Link className="button-secondary" to="/books">
        View Books
      </Link>
    </div>
  );
};

export default Home;
