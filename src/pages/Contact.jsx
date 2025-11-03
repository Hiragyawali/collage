import React, { useState } from "react";


export default function Contact() {
const [formData, setFormData] = useState({ name: "", email: "", message: "" });


const handleChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};


const handleSubmit = (e) => {
e.preventDefault();
alert("Thank you for contacting us! We’ll get back to you soon.");
setFormData({ name: "", email: "", message: "" });
};


return (
<div className="max-w-6xl mx-auto px-4 py-12">
<h1 className="text-4xl font-extrabold text-indigo-700 mb-6">Contact EduBlog</h1>
<p className="text-gray-700 mb-8 max-w-3xl">
Have questions, feedback, or collaboration ideas? We’d love to hear from you! Fill out the form below, and our team will respond as soon as possible.
</p>


<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 max-w-lg">
<div className="mb-5">
<label className="block text-gray-700 mb-2 font-medium">Name</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
required
placeholder="Your full name"
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>


<div className="mb-5">
<label className="block text-gray-700 mb-2 font-medium">Email</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
required
placeholder="you@example.com"
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>


<div className="mb-5">
<label className="block text-gray-700 mb-2 font-medium">Message</label>
<textarea
name="message"
value={formData.message}
onChange={handleChange}
required
rows="5"
placeholder="Write your message here..."
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
></textarea>
</div>


<button
type="submit"
className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
>
Send Message
</button>
</form>


<div className="mt-10 text-center">
<p className="text-gray-600">📧 Email: support@edublog.com</p>
<p className="text-gray-600">📞 Phone: +977-9800000000</p>
<p className="text-gray-600">📍 Address: Butwal, Nepal</p>  
</div>
</div>
);
}