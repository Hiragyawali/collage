import React from "react";


export default function AboutUs() {
return (
<div className="max-w-6xl mx-auto px-4 py-12">
<h1 className="text-4xl font-extrabold text-indigo-700 mb-6">About EduBlog</h1>
<p className="text-gray-700 leading-relaxed mb-6">
EduBlog was founded with a mission to make learning accessible, creative, and community-driven. Our goal is to empower students and teachers by giving them a space to express, learn, and collaborate through blogs and articles.
</p>
<p className="text-gray-700 leading-relaxed mb-6">
Whether you're a teacher sharing your expertise or a student exploring new ideas, EduBlog provides the tools you need to create and discover high-quality educational content. We believe that knowledge grows best when it’s shared.
</p>
<div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
<h2 className="text-2xl font-semibold text-indigo-600 mb-2">Our Vision</h2>
<p className="text-gray-700 mb-4">To become a global hub for learners and educators where education meets creativity.</p>
<h2 className="text-2xl font-semibold text-indigo-600 mb-2">Our Mission</h2>
<p className="text-gray-700">To connect and inspire people through the power of educational blogging and knowledge sharing.</p>
</div>
</div>
);
}