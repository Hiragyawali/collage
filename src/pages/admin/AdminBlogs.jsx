// src/pages/admin/AdminBlogs.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Clock,
  User,
  Calendar,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

export default function AdminBlogs() {
  const location = useLocation();
  const initialStatus = location.state?.status || "all";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [expandedEdits, setExpandedEdits] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchBlogs = async (initial = false) => {
    try {
      if (initial) setLoading(true);
      else setRefreshing(true);

      const res = await fetch("http://localhost/api/get_all_blogs.php?admin=1");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs(true);
    const interval = setInterval(() => fetchBlogs(false), 8000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (blogId) => {
    if (!window.confirm("Approve this blog?")) return;
    await fetch("http://localhost/api/approve_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId }),
    });
    fetchBlogs();
  };

  const handleCancel = async (blogId) => {
    if (!window.confirm("Cancel this blog? It will be marked as cancelled.")) return;
    await fetch("http://localhost/api/cancel_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blog_id: blogId }),
    });
    fetchBlogs();
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Permanently delete this blog? This cannot be undone.")) return;
    await fetch("http://localhost/api/delete_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ blog_id: blogId }),
    });
    fetchBlogs();
  };

  const toggleExpand = (id) => {
    setExpandedBlogs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEditExpand = (id) => {
    setExpandedEdits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderExpandable = (text, id, max = 180, isEdit = false) => {
    if (!text || text.length <= max) return <p className="text-gray-700">{text}</p>;
    const expanded = isEdit ? expandedEdits[id] : expandedBlogs[id];
    return (
      <p className="text-gray-700">
        {expanded ? text : text.slice(0, max) + "..."}
        <button
          onClick={() => (isEdit ? toggleEditExpand(id) : toggleExpand(id))}
          className="ml-2 text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
        >
          {expanded ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Read More <ChevronDown className="w-4 h-4" /></>}
        </button>
      </p>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return { icon: CheckCircle, color: "bg-green-100 text-green-700 border-green-200", label: "Approved" };
      case 0:
        return { icon: Clock, color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Pending" };
      case 2:
        return { icon: XCircle, color: "bg-red-100 text-red-700 border-red-200", label: "Cancelled" };
      default:
        return { icon: AlertCircle, color: "bg-gray-100 text-gray-700", label: "Unknown" };
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(blog => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return blog.is_approved === 0;
    if (filterStatus === "approved") return blog.is_approved === 1;
    if (filterStatus === "cancelled") return blog.is_approved === 2;
    return true;
  });

  return (
    <>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage and moderate all blog submissions</p>
          </div>

          
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { key: "all", label: "All Blogs", count: blogs.length },
            { key: "pending", label: "Pending", count: blogs.filter(b => b.is_approved === 0).length, color: "yellow" },
            { key: "approved", label: "Approved", count: blogs.filter(b => b.is_approved === 1).length, color: "green" },
            { key: "cancelled", label: "Cancelled", count: blogs.filter(b => b.is_approved === 2).length, color: "red" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                filterStatus === tab.key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 hover:border-indigo-300 text-gray-700"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                filterStatus === tab.key
                  ? "bg-white/20"
                  : tab.color === "yellow" ? "bg-yellow-100 text-yellow-700"
                  : tab.color === "green" ? "bg-green-100 text-green-700"
                  : tab.color === "red" ? "bg-red-100 text-red-700"
                  : "bg-gray-100"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">No blogs found</div>
            <p className="text-xl text-gray-500">Try changing the filter or wait for new submissions.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => {
              const status = getStatusBadge(blog.is_approved);
              const StatusIcon = status.icon;

              const editedFields = [];
              if (blog.user_title && blog.user_title !== blog.title) editedFields.push({ field: "Title", original: blog.title, edited: blog.user_title });
              if (blog.user_category && blog.user_category !== blog.category) editedFields.push({ field: "Category", original: blog.category, edited: blog.user_category });
              if (blog.user_tags && blog.user_tags !== blog.tags) editedFields.push({ field: "Tags", original: blog.tags, edited: blog.user_tags });
              if (blog.user_description && blog.user_description !== blog.description) editedFields.push({ field: "Description", original: blog.description, edited: blog.user_description });
              if (blog.user_pdf_path && blog.user_pdf_path !== blog.pdf_path) editedFields.push({ field: "PDF", edited: blog.user_pdf_path });

              return (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </div>
                      <span className="text-xs text-gray-500">
                        ID: {blog.id}
                      </span>
                    </div>

                    {/* Title & Author */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {blog.author_name || "Unknown"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                      {renderExpandable(blog.description, blog.id)}
                    </div>

                    {/* Edited Content Alert */}
                    {editedFields.length > 0 && (
                      <div className="mb-5 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                        <p className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          User Requested Edits ({editedFields.length})
                        </p>
                        <div className="text-sm space-y-2">
                          {editedFields.map((field, i) => (
                            <div key={i}>
                              <span className="font-medium text-gray-700">{field.field}:</span>{" "}
                              {field.field === "PDF" ? (
                                <a href={`http://localhost/api/uploads/${field.edited}`} target="_blank" rel="noreferrer" className="text-indigo-600 underline flex items-center gap-1">
                                  <Download className="w-4 h-4" /> New PDF
                                </a>
                              ) : (
                                renderExpandable(field.edited, blog.id, 80, true)
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                      <span>❤️ {blog.likes || 0} Likes</span>
                      <span>💬 {blog.comments?.length || 0} Comments</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {blog.is_approved === 0 && (
                        <>
                          <button
                            onClick={() => handleApprove(blog.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-all hover:scale-105"
                          >
                            <CheckCircle className="w-5 h-5" /> Approve
                          </button>
                          <button
                            onClick={() => handleCancel(blog.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 font-medium transition-all hover:scale-105"
                          >
                            <XCircle className="w-5 h-5" /> Cancel
                          </button>
                        </>
                      )}
                      {(blog.is_approved === 0 || blog.is_approved === 2) && (
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-all hover:scale-105"
                        >
                          <Trash2 className="w-5 h-5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}