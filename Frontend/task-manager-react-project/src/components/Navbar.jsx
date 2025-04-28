// src/components/Navbar.js

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold tracking-wide hover:scale-105 transform transition duration-300">
          Task Manager
        </h1>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-blue-600 rounded-lg shadow-inner group bg-white hover:bg-blue-100 transition"
            >
              Logout
            </button>
          ) : (
            navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-blue-600 rounded-lg shadow-inner group bg-white hover:bg-blue-100 transition ${
                  location.pathname === item.path ? 'ring-2 ring-white' : ''
                }`}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



