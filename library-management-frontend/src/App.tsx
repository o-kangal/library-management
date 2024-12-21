import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import UserDetail from './pages/UserDetail';
// import BookDetail from './pages/BookDetail';

const App = () => (
    <Router>
        <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/book/:id" element={<BookDetail />} /> */}
        </Routes>
    </Router>
);

export default App;