import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserBookings } from '../services/Api';
import ErrorMessage from '../components/ErrorMessage';
import { formatDate } from '../utils/DateUtils';
import { formatPrice } from '../utils/PriceUtils';
import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaHome,
  FaSpinner,
} from 'react-icons/fa';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Renamed to avoid conflict
  const { user, hydrated } = useSelector((state) => state.auth);
console.log("User state:", user)
  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    setError('');
    try {
      console.log("Fetching user bookings...");
      const data = await getUserBookings();
      console.log("Bookings fetched successfully:", data);
      
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      if (err.response?.status === 401) {
        navigate('/auth/login');
      } else {
        setError('Failed to load your bookings. Please try again.');
      }
    } finally {
      setBookingsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
  if (!hydrated) return; // Wait for auth to hydrate

  if (hydrated && user) {
    fetchBookings();
  } else if (hydrated && !user) {
    navigate('/auth/login');
  }
}, [hydrated, user, fetchBookings, navigate]);


  const renderEmptyState = () => (
    <div className="text-center py-16 bg-white rounded-lg shadow-md">
      <FaHome className="text-6xl text-gray-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">No bookings yet!</h2>
      <p className="text-lg text-gray-500">
        It looks like you haven't booked any stays. Start exploring our amazing properties!
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
      >
        Discover Properties
      </Link>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-64 text-indigo-700">
      <FaSpinner className="animate-spin text-5xl mb-4" />
      <p className="text-xl font-semibold">Loading your travel plans...</p>
    </div>
  );

  const renderBookingCard = (booking) => {
  const { listing } = booking;

  if (!listing) {
    return (
      <div
        key={booking._id}
        className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 border"
      >
        <p className="text-lg font-semibold">Listing unavailable</p>
        <p className="text-sm">This booking is no longer associated with an active listing.</p>
      </div>
    );
  }

  return (
    <div
      key={booking._id}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col sm:flex-row overflow-hidden"
    >
      {listing.images?.[0] && (
        <div className="sm:w-1/3 flex-shrink-0">
          <img
            src={listing.images[0]}
            alt={listing.title}
            onError={(e) => (e.target.style.display = 'none')}
            className="w-full h-48 sm:h-full object-cover rounded-t-lg sm:rounded-t-none sm:rounded-l-lg"
          />
        </div>
      )}

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{listing.title}</h3>
          <p className="text-gray-600 flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-sm text-indigo-500" />
            {listing.location}
          </p>
          <p className="text-gray-700 text-sm mb-3">
            <span className="font-semibold">Dates:</span>{' '}
            <FaCalendarAlt className="inline-block text-xs mr-1" />
            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
          </p>
          <p className="text-2xl font-extrabold text-indigo-700 flex items-center">
            <FaDollarSign className="mr-2 text-lg" />
            {formatPrice(booking.totalPrice)}
          </p>
        </div>
        <div className="mt-4">
          <Link
            to={`/listings/${listing._id}`}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            View Listing <FaHome className="ml-2 -mr-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          <FaCalendarAlt className="inline-block text-indigo-600 mr-3 text-3xl" /> Your Booked Stays
        </h1>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {bookingsLoading
          ? renderLoading()
          : bookings.length === 0
          ? renderEmptyState()
          : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map(renderBookingCard)}
              </div>
            )}
      </div>
    </div>
  );
};

export default Bookings;
