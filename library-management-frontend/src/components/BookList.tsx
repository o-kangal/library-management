import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get<Book[]>("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  let navigate = useNavigate();
  return (
    <div className="card">
      <h2>
        <button className="button-back" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        Book List
      </h2>
      {books.map((book) => (
        <Link className="button-list" to={`/books/${book.id}`}>
          {book.title} by {book.author}
        </Link>
      ))}
    </div>
  );
};

export default BookList;
