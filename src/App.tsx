import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LivePage from './pages/LivePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/live" element={<LivePage />} />
        </Routes>
      </Router>
  );
}

export default App;
