import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to the Library Management System</h1>
      <p>Choose an action below to get started:</p>
      <div style={{ marginTop: "2rem" }}>
        <Link
          to="/users"
          style={{
            display: "inline-block",
            margin: "1rem",
            padding: "1rem 2rem",
            backgroundColor: "#4caf50",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          View Users
        </Link>
        <Link
          to="/books"
          style={{
            display: "inline-block",
            margin: "1rem",
            padding: "1rem 2rem",
            backgroundColor: "#2196f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          View Books
        </Link>
      </div>
    </div>
  );
};

export default Home;
