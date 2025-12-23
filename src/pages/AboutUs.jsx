import React from "react";
import { BookOpen, Users, Sparkles, Globe, Heart, Target } from "lucide-react";

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-indigo-100/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            About EduBlog
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We believe learning should be <span className="text-indigo-600 font-bold">open</span>,{" "}
            <span className="text-purple-600 font-bold">creative</span>, and{" "}
            <span className="text-teal-600 font-bold">shared</span> — not locked behind walls.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                EduBlog was born from a simple idea: <strong>everyone has something valuable to teach, and everyone has something new to learn</strong>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In a world full of short-form content, we wanted to create a space where deep, thoughtful educational writing could thrive — written by real students, teachers, researchers, and lifelong learners like you.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, EduBlog is home to thousands of voices from over 100 countries, covering everything from quantum physics to watercolor techniques.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-10 shadow-xl">
              <div className="text-center">
                <Heart className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
                <blockquote className="text-2xl font-semibold text-gray-800 italic">
                  “The best way to learn is to teach. The best way to teach is to share.”
                </blockquote>
                <p className="mt-6 text-indigo-700 font-medium">— The EduBlog Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mr-5">
                  <Target className="w-9 h-9 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                To become the world's most trusted and vibrant platform where <strong>anyone can learn anything</strong> from real people — not just algorithms or textbooks.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mr-5">
                  <Sparkles className="w-9 h-9 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                To empower every learner and educator with a free, beautiful, and collaborative space to <strong>create, share, and discover</strong> knowledge that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

    

    
    </>
  );
}