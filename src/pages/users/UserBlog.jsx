import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserBlog() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    description: "",
    pdf: null,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const categories = ["Math", "Science", "Programming", "Study", "Motivation"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.tags.trim()) newErrors.tags = "Add at least one tag";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.pdf) newErrors.pdf = "Please upload a PDF file";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (validate()) {
      const user = JSON.parse(localStorage.getItem("user")); // get user_id
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("tags", formData.tags);
      data.append("description", formData.description);
      data.append("pdf", formData.pdf);

      try {
        const res = await fetch("http://localhost/api/add_user_blog.php", {
          method: "POST",
          body: data, // DO NOT set Content-Type
        });
        const result = await res.json();
        setMessage(result.message);

        if (result.success) {
          // Redirect to user dashboard after successful post
          navigate("/user-dashboard");
        }
      } catch (err) {
        setMessage("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Post a New Blog</h1>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category / Subject</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="html, study, motivation"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            rows={4}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-gray-700 mb-1">Upload PDF</label>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full"
          />
          {errors.pdf && <p className="text-red-500 text-sm mt-1">{errors.pdf}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
}
