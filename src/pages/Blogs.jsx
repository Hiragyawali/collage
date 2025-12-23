import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Download, User, Calendar, Clock, ChevronDown, ChevronUp, Pen } from "lucide-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost/api/get_all_blogs.php");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    if (!user) return navigate("/login");
    const formData = new FormData();
    formData.append("blog_id", blogId);
    formData.append("user_id", user.id);

    await fetch("http://localhost/api/like_blog.php", { method: "POST", body: formData });
    fetchBlogs();
  };

  const handleAddComment = async (blogId) => {
    if (!user) return navigate("/login");
    const comment = commentText[blogId]?.trim();
    if (!comment) return;

    await fetch("http://localhost/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId, user_id: user.id, comment }),
    });
    setCommentText(prev => ({ ...prev, [blogId]: "" }));
    fetchBlogs();
  };

  const toggleExpand = (blogId) => {
    setExpandedBlogs(prev => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Explore Blogs
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover inspiring educational content created by students, teachers, and lifelong learners.
          </p>

          {user && (
            <a
              href="/create-blog"
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Pen className="w-5 h-5" />
              Write a New Blog
            </a>
          )}
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">No blogs yet</div>
              <p className="text-xl text-gray-600">Be the first to share your knowledge!</p>
              {user && (
                <a href="/create-blog" className="mt-6 inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                  Start Writing
                </a>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {blogs.map((blog) => {
                const isExpanded = expandedBlogs[blog.id];
                const shouldTruncate = blog.description.length > 300;
                const displayText = isExpanded || !shouldTruncate
                  ? blog.description
                  : blog.description.slice(0, 300) + "...";

                return (
                  <article
                    key={blog.id}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="p-8">
                      {/* Author & Date */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {blog.author?.[0] || <User className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{blog.author || "Anonymous"}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Title & Meta */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                          {blog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(blog.description.split(" ").length / 200)} min read
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-5">
                        {displayText}
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleExpand(blog.id)}
                            className="ml-2 text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>Show Less <ChevronUp className="w-4 h-4" /></>
                            ) : (
                              <>Read More <ChevronDown className="w-4 h-4" /></>
                            )}
                          </button>
                        )}
                      </p>

                      {/* PDF Download */}
                      {blog.pdf_path && (
                        <a
                          href={`http://localhost/api/uploads/${blog.pdf_path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline mb-5"
                        >
                          <Download className="w-5 h-5" />
                          Download PDF
                        </a>
                      )}

                      {/* Likes & Comments */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                        <button
                          onClick={() => handleLike(blog.id)}
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                            blog.hasLiked
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 hover:bg-red-50 text-gray-700"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${blog.hasLiked ? "fill-current" : ""}`} />
                          {blog.likes || 0} Likes
                        </button>

                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageCircle className="w-5 h-5" />
                          {blog.comments_count || 0}
                        </div>
                      </div>

                      {/* Comment Box */}
                      <div className="mt-6 flex gap-3">
                        <input
                          type="text"
                          placeholder="Add a thoughtful comment..."
                          value={commentText[blog.id] || ""}
                          onChange={(e) => setCommentText(prev => ({ ...prev, [blog.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === "Enter" && handleAddComment(blog.id)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleAddComment(blog.id)}
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}