import React from "react";


export default function Home() {
return (
<div className="max-w-6xl mx-auto px-4 py-12">
<section className="text-center mb-12">
<h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome to EduBlog</h1>
<p className="text-gray-700 text-lg max-w-3xl mx-auto">
EduBlog is your go-to educational platform where students and teachers come together to share knowledge, learn new skills, and stay updated with the latest educational trends. Explore articles, tutorials, and learning materials created by passionate learners from around the world.
</p>
</section>


<section className="grid md:grid-cols-3 gap-8">
<div className="bg-white p-6 rounded-xl shadow-md">
<h3 className="text-xl font-semibold text-indigo-600 mb-2">Latest Blogs</h3>
<p className="text-gray-700 mb-4">Stay informed with our latest educational blogs on technology, science, art, and more.</p>
<a href="/blogs" className="text-indigo-600 hover:underline">Read Blogs →</a>
</div>


<div className="bg-white p-6 rounded-xl shadow-md">
<h3 className="text-xl font-semibold text-indigo-600 mb-2">Join Our Community</h3>
<p className="text-gray-700 mb-4">Sign up to become a part of our growing educational community. Start sharing your knowledge today!</p>
<a href="/register" className="text-indigo-600 hover:underline">Join Now →</a>
</div>
</section>
</div>
);
}