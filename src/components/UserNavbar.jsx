// src/components/UserNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
  <Link to="/user-dashboard">EduBlog</Link>
</div>
        <ul className="flex space-x-6 items-center">
          <li>Hello, {user.name || 'User'}</li>
          <li><Link to="/user-dashboard/blogs" className="hover:underline">Blogs</Link></li>
         <li>
  <Link to="/user-dashboard/new-blog" className="hover:underline">
    New Blog
  </Link>
</li>

          <li><Link to="/user-dashboard/profile" className="hover:underline">Profile</Link></li>
          <li><button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-200">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}
