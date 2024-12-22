import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList.tsx";
import UserDetail from "./pages/UserDetail.tsx";
import BookList from "./components/BookList.tsx";
import BookDetail from "./pages/BookDetail.tsx";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
