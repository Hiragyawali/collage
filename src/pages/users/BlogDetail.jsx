import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserBlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  // Fetch blog details
  const fetchBlog = () => {
    fetch(`http://localhost/api/get_blog.php?blog_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setBlog(data.blog);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found</p>;

  // Like/unlike functionality
  const handleLike = () => {
    if (!user) return alert("Please login to like a blog.");
    const formData = new FormData();
    formData.append("blog_id", blog.id);
    formData.append("user_id", user.id);

    fetch("http://localhost/api/like_blog.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(() => fetchBlog())
      .catch(() => alert("Error liking blog"));
  };

  // Add comment
  const handleAddComment = () => {
    if (!user) return alert("Please login to comment.");
    if (!commentText.trim()) return alert("Comment cannot be empty.");

    fetch("http://localhost/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blog.id, user_id: user.id, comment: commentText })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCommentText("");
          fetchBlog();
        } else {
          alert("Failed to add comment.");
        }
      })
      .catch(() => alert("Error adding comment"));
  };

  // Delete comment
  const handleDeleteComment = (commentId, commentUserId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    if (user.id !== commentUserId && user.id !== blog.user_id) {
      return alert("You don't have permission to delete this comment.");
    }

    fetch(`http://localhost/api/delete_comment.php?comment_id=${commentId}&user_id=${user.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (!data.success) alert(data.message || "Failed to delete comment");
        fetchBlog();
      })
      .catch(() => alert("Error deleting comment"));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/user-dashboard/blogs")}
        className="mb-4 text-indigo-600 hover:underline"
      >
        &larr; Back to Blogs
      </button>

      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500">{blog.category} | Tags: {blog.tags}</p>
      <p className="mt-4 text-gray-700">{blog.description}</p>

      {blog.pdf_path && (
        <a
          href={`http://localhost/api/uploads/${blog.pdf_path}`}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 mt-2 inline-block"
        >
          📄 Download PDF
        </a>
      )}

      {/* Like Button */}
      <div className="mt-4">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded text-white ${blog.user_likes_ids?.includes(user?.id) ? "bg-red-600" : "bg-indigo-600"}`}
        >
          {blog.user_likes_ids?.includes(user?.id) ? "Unlike" : "Like"} ({blog.likes || 0})
        </button>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg">Comments:</h3>
        {blog.comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <ul className="mt-2">
            {blog.comments.map(c => (
              <li key={c.id} className="text-gray-700 text-sm border-t py-1 flex justify-between">
                <span>
                  <span className="font-semibold">{c.user_name || "User"}:</span> {c.comment}
                </span>
                {(user?.id === c.user_id || user?.id === blog.user_id) && (
                  <button
                    onClick={() => handleDeleteComment(c.id, c.user_id)}
                    className="text-red-600 text-xs ml-2"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Add Comment */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddComment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Posted by <span className="font-semibold">{blog.author_name}</span> on {new Date(blog.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
