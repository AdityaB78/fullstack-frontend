import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Using Link for internal navigation
import { getAllListings, deleteListing } from '../services/api';
import PropertyCard from '../components/PropertyCard'; // Assuming this component is well-styled
import Button from '../components/Button'; // Assuming this component is well-styled
import ErrorMessage from '../components/ErrorMessage';
import { useSelector } from 'react-redux';
import {
  FaPlusCircle,
  FaHome,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
  FaExclamationCircle,
} from 'react-icons/fa'; // Added icons

const HostDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially for first load
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect if user is not logged in or is not a host
    if (!user) {
      navigate('/auth/login');
      return;
    }
    if (!user.isHost) {
      navigate('/'); // Redirect non-hosts to the main page or an unauthorized page
      return;
    }

    const fetchListings = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      try {
        const data = await getAllListings();
        // Filter listings owned by the current host
        setListings(data.filter((listing) => listing.host && listing.host._id === user._id));
      } catch (err) {
        console.error("Failed to fetch host listings:", err); // Log error for debugging
        if (err.response && err.response.status === 401) {
          navigate('/auth/login'); // Redirect to login on unauthorized access
        } else {
          setError('Failed to load your listings. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [user, navigate]); // Dependencies for useEffect

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }
    setError(''); // Clear previous errors
    try {
      await deleteListing(id);
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
      // Optionally show a success message
    } catch (err) {
      console.error("Failed to delete listing:", err); // Log error for debugging
      setError('Failed to delete listing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-left flex items-center">
            <FaHome className="text-purple-600 mr-3 text-3xl" /> Your Properties
          </h1>
          <Button
            onClick={() => navigate('/host/create-listing')}
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <FaPlusCircle className="mr-2 text-xl" /> Create New Listing
          </Button>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-purple-700">
            <FaSpinner className="animate-spin text-5xl mb-4" />
            <p className="text-xl font-semibold">Loading your properties...</p>
          </div>
        ) : listings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <FaExclamationCircle className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No listings found!</h2>
            <p className="text-lg text-gray-500 mb-6">
              It looks like you haven't added any properties yet.
            </p>
            <Button
              onClick={() => navigate('/host/create-listing')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
            >
              <FaPlusCircle className="mr-2 -ml-1" /> Add Your First Listing
            </Button>
          </div>
        ) : (
          /* Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                <PropertyCard listing={listing} />
                {/* Overlay for Action Buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4 p-4 rounded-lg">
                  <Link
                    to={`/host/edit-listing/${listing._id}`}
                    className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                  <Button
                    onClick={() => handleDelete(listing._id)}
                    className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;