// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    approvedBlogs: 0,
    pendingBlogs: 0,
    cancelledBlogs: 0,
    totalUsers: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/api/admin_dashboard_stats.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      })
      .catch((err) => console.error("Error fetching stats", err));
  }, []);

  // Navigate to blogs page with status filter
  const handleNavigate = (status) => {
    navigate("/admin/blogs", { state: { status } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          className="bg-blue-100 p-4 rounded-lg shadow cursor-pointer"
          onClick={() => handleNavigate("all")}
        >
          <h2 className="text-xl font-semibold text-blue-700">Total Blogs</h2>
          <p className="text-2xl font-bold">{stats.totalBlogs}</p>
        </div>

        <div
          className="bg-green-100 p-4 rounded-lg shadow cursor-pointer"
          onClick={() => handleNavigate("approved")}
        >
          <h2 className="text-xl font-semibold text-green-700">Approved</h2>
          <p className="text-2xl font-bold">{stats.approvedBlogs}</p>
        </div>

        <div
          className="bg-yellow-100 p-4 rounded-lg shadow cursor-pointer"
          onClick={() => handleNavigate("pending")}
        >
          <h2 className="text-xl font-semibold text-yellow-700">Pending</h2>
          <p className="text-2xl font-bold">{stats.pendingBlogs}</p>
        </div>

        <div
          className="bg-red-100 p-4 rounded-lg shadow cursor-pointer"
          onClick={() => handleNavigate("cancelled")}
        >
          <h2 className="text-xl font-semibold text-red-700">Cancelled</h2>
          <p className="text-2xl font-bold">{stats.cancelledBlogs}</p>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-indigo-700">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
