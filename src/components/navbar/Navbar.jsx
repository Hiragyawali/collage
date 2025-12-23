import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              EB
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">EduBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium transition-colors duration-200 pb-1 ${
                  isActive(link.to)
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
          <div className="px-6 py-6 space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-50 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}