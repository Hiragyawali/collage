import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Educational Blog Hub</h1>
          <p>
            Discover, share, and learn from comprehensive educational content
            across all subjects. Join our community of students and educators.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn primary-btn">Get Started</Link>
            <Link to="/blogs" className="btn secondary-btn">Explore Blogs</Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs + Subjects Dropdown */}
      <section className="content-section">
        <div className="latest-blogs">
          <h2>Latest Blogs</h2>
          <div className="blogs-grid">
            <p className="no-blogs">No blogs found. Be the first to create one!</p>
          </div>
        </div>

        <div className="subjects-dropdown">
          <select>
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="literature">Literature</option>
            <option value="history">History</option>
            <option value="computer-science">Computer Science</option>
            <option value="languages">Languages</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default Home;
