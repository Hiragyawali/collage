import React, { useState } from "react";

export default function Categories({ onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "Arts",
    "Commerce",
    "Education",
    "Health",
    "Social Studies",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onSelectCategory) onSelectCategory(category); // notify parent component
  };

  return (
    <div className="bg-gray-100 py-4 px-6 shadow-md rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">
        Blog Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
