import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                EB
              </div>
              <span className="text-lg font-semibold text-gray-800">EduBlog</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/blogs" className="text-gray-600 hover:text-indigo-600">Blogs</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block text-gray-700">Home</Link>
            <Link to="/blogs" onClick={() => setOpen(false)} className="block text-gray-700">Blogs</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block text-gray-700">About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block text-gray-700">Contact</Link>
            <div className="pt-2 border-t mt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block py-2">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block py-2">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
