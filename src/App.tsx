import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoomPage from './pages/RoomPage';
import MenuRooms from './pages/MenuRooms';
import { getAccessToken, isAccessTokenValid, refreshAccessToken, removeTokens } from './services/authService';

const AppRoutes: React.FC = () => {
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAndRedirect = () => {
      removeTokens();
      navigate('/login');
    };
    const scheduleRefresh = () => {
      const token = getAccessToken();
      if (!token) {
        // Only logout if not already on login page
        if (window.location.pathname !== '/login') {
          logoutAndRedirect();
        }
        return;
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.exp) {
          logoutAndRedirect();
          return;
        }
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = payload.exp - now;
        // Refresh 1 minute before expiry
        const refreshIn = (expiresIn - 60) * 1000;
        if (refreshIn > 0) {
          refreshTimeout.current = setTimeout(async () => {
            try {
              await refreshAccessToken();
              // Re-check for token after refresh
              if (getAccessToken()) {
                scheduleRefresh(); // Schedule next refresh
              } else {
                logoutAndRedirect();
              }
            } catch (e) {
              logoutAndRedirect();
            }
          }, refreshIn);
        } else {
          logoutAndRedirect();
        }
      } catch (e) {
        logoutAndRedirect();
      }
    };
    scheduleRefresh();
    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/rooms" element={<MenuRooms />} />
      <Route path="/room/:roomName" element={<RoomPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
