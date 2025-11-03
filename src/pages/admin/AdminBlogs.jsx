// src/pages/admin/AdminBlogs.jsx
import React, { useEffect, useState } from "react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch("http://localhost/api/get_all_blogs.php?admin=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleApprove = (blogId) => {
    fetch("http://localhost/api/approve_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchBlogs();
        else alert(data.message);
      })
      .catch(() => alert("Server error"));
  };

  const handleDelete = (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    fetch("http://localhost/api/delete_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ blog_id: blogId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchBlogs();
        else alert(data.message || "Failed to delete blog");
      })
      .catch(() => alert("Server error"));
  };

  // Auto-refresh blogs every second
  useEffect(() => {
    fetchBlogs(); // initial fetch
    const interval = setInterval(fetchBlogs, 1000); // fetch every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="border p-5 rounded-md shadow-md bg-white">
              <h2 className="text-xl font-semibold">
                {blog.title}{" "}
                {blog.is_approved ? (
                  <span className="text-green-600 text-sm font-medium">(Approved)</span>
                ) : (
                  <span className="text-red-600 text-sm font-medium">(Pending)</span>
                )}
              </h2>
              <p className="text-gray-500 text-sm">By: {blog.author_name}</p>
              <p className="mt-2 text-gray-700">{blog.description}</p>

              {blog.tags && (
                <p className="mt-2 text-gray-500 text-sm">
                  Tags: {blog.tags.split(",").map((tag) => tag.trim()).join(", ")}
                </p>
              )}

              {blog.pdf_path && (
                <a
                  href={`http://localhost/api/uploads/${blog.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline mt-2 block"
                >
                  📄 View PDF
                </a>
              )}

              {/* Likes + Comments */}
              <div className="mt-3 flex items-center gap-4">
                <span className="text-gray-700">❤️ {blog.likes || 0} Likes</span>
                <span className="text-gray-700">💬 {blog.comments?.length || 0} Comments</span>
              </div>

              {/* Approve/Delete Buttons */}
              <div className="mt-4 flex gap-2">
                {!blog.is_approved && (
                  <button
                    onClick={() => handleApprove(blog.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Posted on {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
