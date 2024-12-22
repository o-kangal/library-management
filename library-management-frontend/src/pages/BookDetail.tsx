import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

interface User {
  id: number;
  name: string;
}

interface BookDetailData extends Book {
  averageRating: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetailData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<BookDetailData>(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setError("Failed to fetch book details.");
      });

    axios
      .get<User[]>("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [id]);

  const handleBorrowBook = () => {
    if (!selectedUserId) {
      setMessage("Please select a user.");
      return;
    }

    axios
      .post(`http://localhost:3000/users/${selectedUserId}/borrow/${id}`)
      .then(() => {
        setMessage("Book borrowed successfully!");
      })
      .catch((error) => {
        console.error("Error borrowing book:", error);
        setMessage("Failed to borrow the book.");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Year:</strong> {book.year}
      </p>
      <p>
        <strong>Average Rating:</strong> {book.averageRating}
      </p>

      <div>
        <label htmlFor="user-select">Select User:</label>
        <select
          id="user-select"
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleBorrowBook}>Borrow Book</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookDetail;
