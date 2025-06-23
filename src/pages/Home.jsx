import { useState, useEffect, lazy, Suspense } from 'react'; // Added useState and useEffect for a debounce effect
import useListings from '../hooks/useLisitings';
import PropertyCard from '../components/PropertyCard';
import ErrorMessage from '../components/ErrorMessage';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'; // Added icons for visual appeal


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { listings, loading, error, setLocation } = useListings();
  

  // Debounce effect for the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setLocation(searchTerm);
    },500); // 500ms debounce
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setLocation]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Hero Section with Title and Search */}
        <section className="text-center mb-12 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            Discover Your <span className="text-indigo-600">Dream Stay</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore a world of unique properties and find the perfect place for your next adventure.
          </p>

          {/* Search Input with Icon and Styling */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location (e.g., New York, Paris)..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 shadow-sm text-base"
              aria-label="Search by location"
            />
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </section>

        {/* Error Message Display */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            <p className="ml-4 text-xl text-indigo-700 font-semibold">Loading amazing properties...</p>
          </div>
        ) : listings.length > 0 ? (
          /* Listings Grid */
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {listings.map((listing) => (
                // Adding a wrapper div with key directly to PropertyCard if it's the root of the map
                // If PropertyCard renders multiple elements, a fragment or a div around it is fine.
                <PropertyCard key={listing._id} listing={listing} />
              ))}
            </div>
          </section>
        ) : (
          /* No Listings Found */
          <div className="text-center py-16">
            <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-700 mb-2">No properties found!</h2>
            <p className="text-lg text-gray-500">Try adjusting your search or explore other locations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;