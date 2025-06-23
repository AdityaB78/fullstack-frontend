import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useState } from 'react';
import logo from '../assets/stayfinderlogo.png';

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBook,
  FaPlusSquare,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/', icon: FaHome, auth: 'both' },
  { name: 'About', path: '/about', icon: FaInfoCircle, auth: 'both' },
  { name: 'My Bookings', path: '/bookings', icon: FaBook, auth: 'user' },
  { name: 'Host Dashboard', path: '/host/dashboard', icon: FaTachometerAlt, auth: 'host' },
];

const authLinks = [
  { name: 'Login', path: '/auth/login', icon: FaSignInAlt },
  { name: 'Register', path: '/auth/register', icon: FaUserPlus },
];

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
    setIsMobileMenuOpen(false);
  };

  if (loading) return null; // Prevent rendering until user is fully loaded

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.auth === 'both') return true;
    if (link.auth === 'user' && user) return true;
    if (link.auth === 'host' && user?.isHost) return true;
    return false;
  });

  const renderLinks = (isMobile = false) => (
    <>
      {filteredNavLinks.map(({ name, path, icon: Icon }) => (
        <Link
          key={name}
          to={path}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className={`flex items-center ${
            isMobile
              ? 'text-xl py-2 text-white hover:text-indigo-200 border-b border-indigo-600'
              : 'text-lg font-medium hover:text-indigo-200 relative group'
          }`}
        >
          {isMobile && <Icon className="mr-3 text-2xl" />} {name}
          {!isMobile && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          )}
        </Link>
      ))}
    </>
  );

  const renderAuthButtons = (isMobile = false) =>
    authLinks.map(({ name, path, icon: Icon }) => (
      <Link
        key={name}
        to={path}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        className={`flex items-center ${
          isMobile
            ? 'text-xl py-2 text-white hover:text-indigo-200 border-b border-indigo-600'
            : 'text-lg font-medium px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-indigo-700 transition'
        }`}
      >
        <Icon className="mr-2" /> {name}
      </Link>
    ));

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-4 shadow-xl relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={logo} alt="StayFinder Logo" className="h-9 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-2xl font-extrabold tracking-wide">StayFinder</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {renderLinks(false)}

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex items-center text-lg font-medium px-3 py-1 rounded-full bg-indigo-600">
                  <FaUserCircle className="mr-2 text-xl" />
                  {/* ✅ Safe fallback for user display */}
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-lg font-medium px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </>
          ) : (
            renderAuthButtons(false)
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white text-3xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-indigo-700 bg-opacity-95 shadow-lg transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-4 space-y-3">
          {renderLinks(true)}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-xl text-red-300 hover:text-red-100 py-2 border-b border-indigo-600"
            >
              <FaSignOutAlt className="mr-3 text-2xl" /> Logout
            </button>
          ) : (
            renderAuthButtons(true)
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
