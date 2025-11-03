import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Fetch all blogs
  const fetchBlogs = () => {
    fetch("http://localhost/api/get_all_blogs.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle like
  const handleLike = (blogId) => {
    if (!user) return navigate("/login"); // redirect if not logged in

    const formData = new FormData();
    formData.append("blog_id", blogId);
    formData.append("user_id", user.id);

    fetch("http://localhost/api/like_blog.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => fetchBlogs())
      .catch(() => alert("Error liking blog"));
  };

  // Handle comment input change
  const handleCommentChange = (blogId, value) => {
    setCommentText((prev) => ({ ...prev, [blogId]: value }));
  };

  // Handle add comment
  const handleAddComment = (blogId) => {
    if (!user) return navigate("/login"); // redirect if not logged in
    const comment = commentText[blogId]?.trim();
    if (!comment) return alert("Comment cannot be empty.");

    fetch("http://localhost/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId, user_id: user.id, comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCommentText((prev) => ({ ...prev, [blogId]: "" }));
          fetchBlogs();
        } else {
          alert(data.message || "Failed to add comment");
        }
      })
      .catch(() => alert("Error adding comment"));
  };

  if (loading)
    return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs have been posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={`blog-${blog.id}`}
              className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition-all"
            >
              <h2 className="text-2xl font-semibold text-indigo-600">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.category} | Tags: {blog.tags}</p>
              <p className="mt-3 text-gray-700">{blog.description}</p>

              {blog.pdf_path && (
                <a
                  href={`http://localhost/api/uploads/${blog.pdf_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 mt-3 inline-block font-medium hover:underline"
                >
                  📄 Download PDF
                </a>
              )}

              {/* Like + Comment Section */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleLike(blog.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-white bg-indigo-600"
                >
                  ❤️ {blog.likes || 0}
                </button>
                <span className="text-gray-600 text-sm">
                  💬 {blog.comments_count || 0} Comments
                </span>
              </div>

              {/* Comment input */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[blog.id] || ""}
                  onChange={(e) => handleCommentChange(blog.id, e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddComment(blog.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Post Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
