import React from "react";
import { BookOpen, Users, Sparkles, ArrowRight, Globe, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-indigo-100/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 leading-tight">
              Welcome to EduBlog
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
              A vibrant community where <span className="text-indigo-600 font-semibold">students</span> and{" "}
              <span className="text-purple-600 font-semibold">educators</span> connect, share knowledge,
              and inspire lifelong learning through blogs, tutorials, and ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="/blogs"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Explore Blogs
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Join Community
                <Users className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EduBlog?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn, teach, and grow together in a supportive and engaging environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo think">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Rich Learning Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Access thousands of high-quality articles, tutorials, and guides on science, tech, arts, and beyond.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Lightbulb className="w-8 h-8 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Your Knowledge</h3>
              <p className="text-gray-600 leading-relaxed">
              Publish your own blogs and inspire learners worldwide. Teaching is the best way to learn.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors">
                <Globe className="w-8 h-8 text-teal-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with passionate learners and educators from every corner of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are already growing with EduBlog.
          </p>
          <a
            href="/register"
            className="inline-flex items-center px-10 py-5 bg-white text-indigo-700 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Get Started for Free
            <ArrowRight className="ml-3 w-6 h-6" />
          </a>
        </div>
      </section>
    </>
  );
}