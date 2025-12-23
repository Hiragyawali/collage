// src/pages/users/EditUserBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUserBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    description: "",
    pdf: null, // optional replacement PDF
  });
  const [existingPDF, setExistingPDF] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const categories = ["Math", "Science", "Programming", "Study", "Motivation"];

  // Fetch blog data on mount
  useEffect(() => {
    fetch(`http://localhost/api/get_blog.php?blog_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.blog.user_id === user.id) {
          setFormData({
            title: data.blog.title,
            category: data.blog.category,
            tags: data.blog.tags,
            description: data.blog.description,
            pdf: null,
          });
          setExistingPDF(data.blog.pdf_path);
        } else {
          setMessage("You cannot edit this blog or it does not exist.");
        }
      })
      .catch(() => setMessage("Failed to load blog data."));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") setFormData(prev => ({ ...prev, pdf: files[0] }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.tags.trim()) newErrors.tags = "Add at least one tag";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;

    const data = new FormData();
    data.append("blog_id", id);
    data.append("user_id", user.id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("tags", formData.tags);
    data.append("description", formData.description);
    if (formData.pdf) data.append("pdf", formData.pdf); // optional new PDF

    try {
      const res = await fetch("http://localhost/api/edit_user_blog.php", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setMessage(result.message);
      if (result.success) navigate("/user-dashboard");
    } catch {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Edit Blog</h1>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">PDF (optional)</label>
          {existingPDF && (
            <p>
              Current PDF: <a href={`http://localhost/api/uploads/${existingPDF}`} target="_blank" rel="noreferrer" className="text-indigo-600">View PDF</a>
            </p>
          )}
          <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} className="w-full mt-1" />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">Update Blog</button>
      </form>
    </div>
  );
}
