// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/users/UserDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserBlog from "./pages/users/UserBlog";
import UserBlogsAll from "./pages/users/UserBlogsall";
import AdminBlogs from "./pages/admin/AdminBlogs";


export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const location = useLocation();

  const showUserNavbar = location.pathname.startsWith("/user-dashboard") && user;
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Conditional Navbar Rendering */}
      {!isAdminRoute && (showUserNavbar ? <UserNavbar /> : <Navbar />)}
      {isAdminRoute && admin && <AdminNavbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />

          <Route path="/register" element={user ? <Navigate to="/user-dashboard" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/user-dashboard" /> : <Login />} />

          {/* User dashboard routes */}
          <Route path="/user-dashboard" element={user ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/user-dashboard/new-blog" element={user ? <UserBlog /> : <Navigate to="/login" />} />
          <Route path="/user-dashboard/blogs" element={user ? <UserBlogsAll /> : <Navigate to="/login" />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
          <Route path="/admin/dashboard" element={admin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
           <Route path="/admin/dashboard/blogs" element={<AdminBlogs />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isAdminRoute && (
        <footer className="bg-indigo-600 text-white text-center py-4 mt-10">
          <p>&copy; {new Date().getFullYear()} EduBlog. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}
