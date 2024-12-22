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
  currentOwner: User | null;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetailData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch book details and users
  useEffect(() => {
    axios
      .get<BookDetailData>(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
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
        setBook((prev) =>
          prev
            ? {
                ...prev,
                currentOwner:
                  users.find((u) => u.id === selectedUserId) || null,
              }
            : prev
        );
      })
      .catch((error) => {
        console.error("Error borrowing book:", error);
        setMessage("Failed to borrow the book.");
      });
  };

  const handleReturnBook = () => {
    if (!book?.currentOwner) {
      setMessage("This book is not borrowed.");
      return;
    }

    axios
      .post(`http://localhost:3000/users/${book.currentOwner.id}/return/${id}`)
      .then(() => {
        setMessage("Book returned successfully!");
        setBook((prev) => (prev ? { ...prev, currentOwner: null } : prev));
      })
      .catch((error) => {
        console.error("Error returning book:", error);
        setMessage("Failed to return the book.");
      });
  };

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

      {book.currentOwner ? (
        <div>
          <p>
            <strong>Borrowed By:</strong> {book.currentOwner.name}
          </p>
          <button onClick={handleReturnBook}>Return Book</button>
        </div>
      ) : (
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
          <button onClick={handleBorrowBook}>Borrow Book</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookDetail;
