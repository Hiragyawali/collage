import React from "react";
import BlogCard from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Blogs() {
  // Placeholder posts until backend is connected
  const posts = [
    {
      title: "10 Tips for Effective Studying",
      author: "Jane Smith",
      date: "October 31, 2023",
      category: "Education",
      excerpt: "Learn how to improve your study habits and retain information better.",
      image: "https://source.unsplash.com/200x150/?student,study"
    },
    {
      title: "Benefits of Online Learning",
      author: "John Doe",
      date: "November 9, 2023",
      category: "Education",
      excerpt: "Online learning offers flexibility and accessibility for all learners.",
      image: "https://source.unsplash.com/200x150/?laptop,learning"
    },
    {
      title: "Effective Time Management",
      author: "Alice Johnson",
      date: "October 15, 2023",
      category: "Productivity",
      excerpt: "Time management tips for students and professionals alike.",
      image: "https://source.unsplash.com/200x150/?time,planning"
    },
    {
      title: "How to Stay Motivated",
      author: "Michael Lee",
      date: "November 1, 2023",
      category: "Motivation",
      excerpt: "Simple strategies to keep your motivation high and stay focused.",
      image: "https://source.unsplash.com/200x150/?motivation,focus"
    },
    {
      title: "Top 5 Online Learning Platforms",
      author: "Sara Khan",
      date: "October 20, 2023",
      category: "Education",
      excerpt: "A guide to the best online platforms for learning new skills.",
      image: "https://source.unsplash.com/200x150/?online,learning"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      {/* Main Blog List */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Blogs</h1>

        <div className="grid gap-6">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
