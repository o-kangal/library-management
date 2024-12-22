import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface BorrowedBook {
  id: number;
  title: string;
  borrow_date: string;
  return_date: string | null;
  rating: number | null;
}

interface User {
  id: number;
  name: string;
}

interface UserDetailType {
  user: User;
  borrowedBooks: BorrowedBook[];
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetailType | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<UserDetailType>(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);

  const handleReturnBook = (bookId: number) => {
    axios
      .post(`http://localhost:3000/users/${id}/return/${bookId}`)
      .then(() => {
        setMessage("Book returned successfully!");
        setUser((prev) =>
          prev
            ? {
                ...prev,
                borrowedBooks: prev.borrowedBooks.map((book) =>
                  book.id === bookId
                    ? { ...book, return_date: new Date().toISOString() }
                    : book
                ),
              }
            : prev
        );
      })
      .catch((error) => {
        console.error("Error returning book:", error);
        setMessage("Failed to return the book.");
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const notReturnedBooks = user.borrowedBooks.filter(
    (book) => book.return_date === null
  );
  const returnedBooks = user.borrowedBooks.filter(
    (book) => book.return_date !== null
  );

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.user.name}
      </p>

      <h2>Borrowed Books</h2>

      {notReturnedBooks.length > 0 && (
        <div>
          <h3>Currently Borrowed Books</h3>
          <ul>
            {notReturnedBooks.map((book) => (
              <li key={book.id}>
                <p>
                  <strong>Title:</strong> {book.title}
                </p>
                <p>
                  <strong>Borrow Date:</strong> {book.borrow_date}
                </p>
                <button onClick={() => handleReturnBook(book.id)}>
                  Return Book
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {returnedBooks.length > 0 && (
        <div>
          <h3>Returned Books</h3>
          <ul>
            {returnedBooks.map((book) => (
              <li key={book.id}>
                <p>
                  <strong>Title:</strong> {book.title}
                </p>
                <p>
                  <strong>Borrow Date:</strong> {book.borrow_date}
                </p>
                <p>
                  <strong>Return Date:</strong> {book.return_date}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {book.rating !== null ? book.rating : "No rating"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default UserDetail;
