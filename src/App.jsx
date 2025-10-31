import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserNavbar from "./components/UserNavbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";

const AppWrapper = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isUserPage = location.pathname.startsWith("/user");

  // Check token and verify login on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost/api/user.php", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsLoggedIn(data.status === "success");
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Checking login...</p>;

  return (
    <>
      {isUserPage ? <UserNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/user"
          element={isLoggedIn ? <UserPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
