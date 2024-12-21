import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
