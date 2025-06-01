import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoomPage from './pages/RoomPage';
import MenuRooms from './pages/MenuRooms';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/rooms" element={<MenuRooms />} />
            <Route path="/room/:roomName" element={<RoomPage />} />
        </Routes>
      </Router>
  );
}

export default App;
