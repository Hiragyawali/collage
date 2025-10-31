import React, { useEffect, useState } from 'react';

const UserNavbar = () => {
  const [username, setUsername] = useState('');

  // Fetch user info from backend
 useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUsername('Guest');
      return;
    }

    try {
      const res = await fetch('http://localhost/api/user.php', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUsername(data.data.name);
      } else {
        setUsername('Guest');
      }
    } catch (err) {
      console.error(err);
      setUsername('Guest');
    }
  };

  fetchUser();
}, []);


  return (
    <>
      <nav className="navbar">
        <ul className="navbar-menu">
          <li className="username">Hello, {username}</li>
          <li><a href="/home">Home</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/popular">Popular</a></li>
          <li>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search..." />
              <button type="submit">🔍</button>
            </form>
          </li>
          <li><a href="/profile">My Profile</a></li>
        </ul>
      </nav>

      {/* CSS */}
      <style>{`
        .navbar {
          background-color: #2c3e50;
          padding: 10px 20px;
        }

        .navbar-menu {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .navbar-menu li {
          color: white;
        }

        .navbar-menu a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .navbar-menu a:hover {
          text-decoration: underline;
        }

        .search-form {
          display: flex;
          align-items: center;
        }

        .search-form input {
          padding: 5px;
          border-radius: 5px;
          border: none;
        }

        .search-form button {
          padding: 5px 8px;
          border: none;
          border-radius: 5px;
          background-color: #e67e22;
          color: white;
          cursor: pointer;
          margin-left: 5px;
        }

        .search-form button:hover {
          background-color: #d35400;
        }

        .username {
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .navbar-menu {
            flex-direction: column;
            gap: 10px;
          }
          .search-form {
            width: 100%;
          }
          .search-form input {
            flex: 1;
          }
        }
      `}</style>
    </>
  );
};

export default UserNavbar;
