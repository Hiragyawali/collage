import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function AdminReports() {
  const [userStats, setUserStats] = useState({ daily: 0, weekly: 0, yearly: 0, total: 0 });
  const [postStats, setPostStats] = useState({
    daily: 0,
    weekly: 0,
    yearly: 0,
    total: 0,
    categories: { math: 0, science: 0, programming: 0, study: 0, motivation: 0 },
  });

  // Real data from API only
  const [userGrowthData, setUserGrowthData] = useState([]); // Last 7 days users
  const [postTrendData, setPostTrendData] = useState([]);   // Last 7 days posts

  const categoryData = Object.keys(postStats.categories).map((key) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    count: postStats.categories[key],
  }));

  useEffect(() => {
    fetchUserStats();
    fetchPostStats();
    fetchWeeklyUserTrend();
    fetchWeeklyPostTrend();
  }, []);

  // 1. Basic Stats
  const fetchUserStats = async () => {
    try {
      const res = await fetch("http://localhost/api/admin/getUserStats.php");
      const data = await res.json();
      setUserStats(data);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    }
  };

  const fetchPostStats = async () => {
    try {
      const res = await fetch("http://localhost/api/admin/getPostStats.php");
      const data = await res.json();
      setPostStats(data);
    } catch (err) {
      console.error("Failed to fetch post stats", err);
    }
  };

  // 2. Weekly User Growth (Last 7 Days)
  const fetchWeeklyUserTrend = async () => {
    try {
      const res = await fetch("http://localhost/api/admin/getWeeklyUserTrend.php");
      const data = await res.json();
      setUserGrowthData(data); // Expected: [{ name: "Mon", users: 3 }, ...]
    } catch (err) {
      console.error("Failed to load user trend", err);
      setUserGrowthData([]);
    }
  };

  // 3. Weekly Post Trend (Last 7 Days)
  const fetchWeeklyPostTrend = async () => {
    try {
      const res = await fetch("http://localhost/api/admin/getWeeklyPostTrend.php");
      const data = await res.json();
      setPostTrendData(data); // Expected: [{ name: "Mon", posts: 8 }, ...]
    } catch (err) {
      console.error("Failed to load post trend", err);
      setPostTrendData([]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Admin Reports & Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={userStats.total} color="indigo" />
        <StatCard title="New Users (Week)" value={`+${userStats.weekly}`} color="green" />
        <StatCard title="Total Posts" value={postStats.total} color="purple" />
        <StatCard title="Posts Today" value={`+${postStats.daily}`} color="orange" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth */}
        <ChartBox title="User Growth (Last 7 Days)">
          {userGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No user data available for the last 7 days
            </div>
          )}
        </ChartBox>

        {/* Post Trend */}
        <ChartBox title="Post Activity (Last 7 Days)">
          {postTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={postTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="posts" stroke="#10b981" fill="#86efac" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No post data available for the last 7 days
            </div>
          )}
        </ChartBox>

        {/* Posts by Category */}
        <ChartBox title="Posts by Category" full>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {categoryData.map((item) => (
              <div key={item.category} className="bg-indigo-50 p-4 rounded-lg text-center shadow">
                <p className="font-semibold text-indigo-800">{item.category}</p>
                <p className="text-2xl font-bold text-indigo-600">{item.count}</p>
              </div>
            ))}
          </div>
        </ChartBox>
      </div>
    </div>
  );
}

// Reusable Components
function StatCard({ title, value, color }) {
  const colors = {
    indigo: "border-indigo-600",
    green: "border-green-600",
    purple: "border-purple-600",
    orange: "border-orange-600",
  };

  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 border-l-4 ${colors[color]}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}

function ChartBox({ title, children, full }) {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${full ? "lg:col-span-2" : ""}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
}