import React, { useEffect, useState } from "react";

export default function UserBlogsAll() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const fetchBlogs = () => {
    const url = user?.isAdmin
      ? "http://localhost/api/get_all_blogs.php?admin=1"
      : "http://localhost/api/get_all_blogs.php";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const blogsWithExtras = data.blogs.map(blog => ({
            ...blog,
            likes: blog.likes || 0,
            comments: blog.comments || [],
            userLiked: blog.user_likes_ids?.includes(user?.id) || false,
          }));
          setBlogs(blogsWithExtras);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLike = (blogId) => {
    if (!user) return alert("Please login to like a blog.");
    const formData = new FormData();
    formData.append("blog_id", blogId);
    formData.append("user_id", user.id);

    fetch("http://localhost/api/like_blog.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(() => fetchBlogs())
      .catch(() => alert("Error liking blog"));
  };

  const handleCommentChange = (blogId, text) => {
    setCommentText(prev => ({ ...prev, [blogId]: text }));
  };

  const handleAddComment = (blogId) => {
    if (!user) return alert("Please login to comment.");
    const comment = commentText[blogId]?.trim();
    if (!comment) return alert("Comment cannot be empty.");

    fetch("http://localhost/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId, user_id: user.id, comment })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCommentText(prev => ({ ...prev, [blogId]: "" }));
          fetchBlogs();
        } else {
          alert("Failed to add comment.");
        }
      })
      .catch(() => alert("Error adding comment"));
  };

  const handleDeleteComment = (commentId, blogOwnerId, commentUserId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    // Only allow deletion if current user is comment author OR blog owner
    if (user.id !== commentUserId && user.id !== blogOwnerId) {
      return alert("You don't have permission to delete this comment.");
    }

    fetch(`http://localhost/api/delete_comment.php?comment_id=${commentId}&user_id=${user.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (!data.success) alert(data.message || "Failed to delete comment");
        fetchBlogs();
      })
      .catch(() => alert("Error deleting comment"));
  };

  const toggleComments = (blogId) => {
    setExpandedComments(prev => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  useEffect(() => fetchBlogs(), []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <div key={`blog-${blog.id}`} className="bg-white p-5 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold text-indigo-600">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.category} | Tags: {blog.tags}</p>
              <p className="mt-2 text-gray-700">{blog.description}</p>

              {blog.pdf_path && (
                <a href={`http://localhost/api/uploads/${blog.pdf_path}`} target="_blank" rel="noreferrer" className="text-indigo-600 mt-2 inline-block">
                  📄 Download PDF
                </a>
              )}

              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => user ? handleLike(blog.id) : window.location.href="/login"}
                  className={`px-3 py-1 rounded-md text-white ${blog.userLiked ? "bg-red-600" : "bg-indigo-600"}`}
                >
                  {blog.userLiked ? "Unlike" : "Like"} ({blog.likes})
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                {blog.comments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                ) : (
                  <>
                    <ul className="mt-2">
                      {(expandedComments[blog.id] ? blog.comments : blog.comments.slice(0, 3)).map(comment => (
                        <li key={`comment-${comment.id}`} className="text-gray-700 text-sm border-t py-1 flex justify-between">
                          <span>
                            <span className="font-semibold">{comment.user_name || "User"}:</span> {comment.comment}
                          </span>
                          {(user?.id === comment.user_id || user?.id === blog.user_id) && (
                            <button
                              onClick={() => handleDeleteComment(comment.id, blog.user_id, comment.user_id)}
                              className="text-red-600 text-xs ml-2"
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      ))}
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

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[blog.id] || ""}
                  onChange={e => handleCommentChange(blog.id, e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => user ? handleAddComment(blog.id) : window.location.href="/login"}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Post Comment
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Posted by <span className="font-semibold">{blog.author_name}</span> on {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
