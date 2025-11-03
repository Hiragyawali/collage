import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBlogs = () => {
    if (!user?.id) return;

    fetch(`http://localhost/api/get_user_blogs.php?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLike = (blogId) => {
    if (!user?.id) return alert("Login required to like a blog.");
    const formData = new FormData();
    formData.append("blog_id", blogId);
    formData.append("user_id", user.id);

    fetch("http://localhost/api/like_blog.php", { method: "POST", body: formData })
      .then((res) => res.json())
      .then(() => fetchBlogs())
      .catch(() => alert("Failed to like blog"));
  };

  const handleCommentChange = (blogId, value) => {
    setCommentInputs((prev) => ({ ...prev, [blogId]: value }));
  };

  const handleCommentSubmit = (e, blogId) => {
    e.preventDefault();
    const comment = commentInputs[blogId]?.trim();
    if (!comment) return;

    fetch("http://localhost/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId, user_id: user.id, comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCommentInputs((prev) => ({ ...prev, [blogId]: "" }));
          fetchBlogs();
        } else alert(data.message || "Failed to add comment");
      })
      .catch(() => alert("Server error"));
  };

  const handleDeleteComment = (commentId, blogOwnerId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    // Allow deletion if current user is the comment author OR blog author
    fetch(`http://localhost/api/delete_comment.php?comment_id=${commentId}&user_id=${user.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) alert(data.message || "Failed to delete comment");
        fetchBlogs();
      })
      .catch(() => alert("Server error"));
  };

  const toggleComments = (blogId) => {
    setExpandedComments((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const renderCommentText = (text, max = 100) =>
    text.length <= max ? text : text.slice(0, max) + "...";

  useEffect(() => {
  fetchBlogs(); // initial fetch

  const interval = setInterval(() => {
    fetchBlogs(); // fetch every second
  }, 1000); // 1000 ms = 1 second

  return () => clearInterval(interval); // cleanup on unmount
}, []);


  if (loading) return <p className="text-center mt-10">Loading your blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Your Dashboard</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500">You haven't posted any blogs yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div key={`blog-${blog.id}`} className="border p-4 rounded-md shadow-md bg-white">
              <h2 className="text-xl font-semibold text-indigo-600">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.category} | Tags: {blog.tags}</p>
              <p className="mt-2 text-gray-700">{blog.description}</p>

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
              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => handleLike(blog.id)}
                  className={`px-3 py-1 rounded-md text-white ${
                    blog.userLiked ? "bg-red-600" : "bg-indigo-600"
                  }`}
                >
                  {blog.userLiked ? "Unlike" : "Like"} ({blog.likes || 0})
                </button>
              </div>

              {/* Comments */}
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                {blog.comments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                ) : (
                  <>
                    <ul className="mt-2">
                      {(expandedComments[blog.id] ? blog.comments : blog.comments.slice(0, 3)).map(
                        (comment) => (
                          <li
                            key={`comment-${comment.id}`}
                            className="border-t py-1 text-gray-700 text-sm flex justify-between items-start"
                          >
                            <span>
                              <span className="font-semibold">{comment.user_name}:</span>{" "}
                              {renderCommentText(comment.comment)}
                            </span>
                            {(comment.user_id === user.id || blog.user_id === user.id) && (
                              <button
                                onClick={() => handleDeleteComment(comment.id, blog.user_id)}
                                className="text-red-600 text-xs ml-2"
                              >
                                Delete
                              </button>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    {blog.comments.length > 3 && (
                      <button
                        onClick={() => toggleComments(blog.id)}
                        className="text-indigo-600 text-sm mt-1"
                      >
                        {expandedComments[blog.id] ? "Show Less Comments" : `Show All Comments (${blog.comments.length})`}
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Add Comment Form */}
              <form
                onSubmit={(e) => handleCommentSubmit(e, blog.id)}
                className="mt-4 flex gap-2"
              >
                <input
                  type="text"
                  value={commentInputs[blog.id] || ""}
                  onChange={(e) => handleCommentChange(blog.id, e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow border rounded-md px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Post
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
