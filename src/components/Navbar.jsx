import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
    }
  }, []);

  const handleDashboard = () => {
    if (user) {
      user.role === 'student' ? navigate('/user-dashboard') : navigate('/campus-dashboard');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold">Campus Vibes</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Show Events link only for students */}
          {user && user.role === 'student' && (
            <Link
              to="/events"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Events
            </Link>
          )}

          {/* Show Create Event link only for campuses */}
          {user && user.role === 'campus' && (
            <Link
              to="/events/new"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Create Event
            </Link>
          )}

          <div className="relative">
            {/* User name and role icon as clickable button */}
            {user && (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                {user.role === 'student' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>
            )}

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  onClick={handleDashboard}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
