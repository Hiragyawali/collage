import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin')) || {};

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-red-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">Admin Panel</div>
        <ul className="flex space-x-6 items-center">
          <li>Hello, {admin.name || 'Admin'}</li>
          <li><Link to="/admin/dashboard/blogs" className="hover:underline">Blogs</Link></li>
          <li><Link to="/admin/reports" className="hover:underline">Reports</Link></li>
          <li><button onClick={handleLogout} className="bg-white text-red-600 px-3 py-1 rounded-md hover:bg-gray-200">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}
