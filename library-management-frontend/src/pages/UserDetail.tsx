import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface BorrowedBook {
  title: string;
  borrow_date: string;
  return_date: string | null;
  rating: number | null;
}

interface ApiResponse {
  user: User;
  borrowedBooks: BorrowedBook[];
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<ApiResponse>(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setUser(response.data.user);
        setBorrowedBooks(response.data.borrowedBooks);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book, index) => (
          <li key={index}>
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Borrow Date:</strong> {book.borrow_date}
            </p>
            <p>
              <strong>Return Date:</strong>{" "}
              {book.return_date || "Not returned yet"}
            </p>
            <p>
              <strong>Rating:</strong> {book.rating || "No rating yet"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
