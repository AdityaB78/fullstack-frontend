import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import {
  FaHome,
  FaPlusCircle,
  FaUserShield,
  FaSignOutAlt,
} from 'react-icons/fa';
import Footer from '../components/Footer';

const HostLayout = () => {
  const { user, hydrated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // ✅ Redirect to home if user is not host
  useEffect(() => {
    if (hydrated && (!user || !user.isHost)) {
      navigate('/', { replace: true });
    }
  }, [user, hydrated, navigate]);

  // While checking auth, show nothing or a loading spinner
  if (!hydrated) return null;

  const navItems = [
    { name: 'My Listings', path: '/host/dashboard', icon: FaHome },
    { name: 'Create Listing', path: '/host/create-listing', icon: FaPlusCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </header>

      <div className="flex flex-grow pt-16">
        <aside className="w-full sm:w-64 bg-gray-800 text-white flex-shrink-0 p-4 shadow-xl">
          <h2 className="text-2xl font-extrabold mb-6 text-indigo-300 border-b border-indigo-700 pb-3">
            <FaUserShield className="inline-block mr-2 text-3xl" /> Host Panel
          </h2>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition duration-200
                  ${location.pathname === item.path
                    ? 'bg-indigo-700 text-white shadow-lg'
                    : 'text-indigo-200 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <item.icon className="mr-3 text-xl" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              to="/logout"
              className="flex items-center px-4 py-3 rounded-lg text-lg font-medium text-red-300 hover:bg-gray-700 hover:text-red-100 transition duration-200"
            >
              <FaSignOutAlt className="mr-3 text-xl" /> Logout
            </Link>
          </div>
        </aside>

        <main className="flex-grow p-6 sm:p-8 lg:p-10 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
              <Footer className="w-full bg-gray-800 text-white py-6 mt-auto" />

    </div>
  );
};

export default HostLayout;
