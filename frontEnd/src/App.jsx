// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isLoggedIn } from "./utils/auth";

const App = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

 
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!loggedIn ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
