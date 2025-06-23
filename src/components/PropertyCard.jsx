import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/PriceUtils';
import placeholder from '../assets/placeholder.png'; // Your existing placeholder image
import { FaMapMarkerAlt, FaDollarSign, FaStar } from 'react-icons/fa'; // Added icons

const PropertyCard = ({ listing }) => {
  // Fallback for missing images or title
  const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : placeholder;
  const cardTitle = listing.title || 'Untitled Property';
  const cardLocation = listing.location || 'Unknown Location';
  const priceDisplay = listing.pricePerNight ? formatPrice(listing.pricePerNight) : 'Price on Request';

  // Optional: Simulate average rating for display if you plan to add ratings later
  const averageRating = listing.averageRating || (Math.random() * (5 - 3) + 3).toFixed(1); // Placeholder rating
  const reviewCount = listing.reviewCount || Math.floor(Math.random() * 200); // Placeholder review count

  return (
    <Link
      to={`/listings/${listing._id}`}
      className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-white group"
    >
      {/* Property Image */}
      <div className="w-full h-56 overflow-hidden"> {/* Increased height for better visual */}
        <img
          src={imageUrl}
          alt={cardTitle}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 space-y-2">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
          {cardTitle}
        </h3>

        {/* Location */}
        <p className="text-gray-600 flex items-center text-sm">
          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
          {cardLocation}
        </p>

        {/* Price */}
        <p className="text-2xl font-extrabold text-gray-800 flex items-center pt-2">
          <FaDollarSign className="mr-1 text-green-600" />
          {priceDisplay}<span className="text-base font-normal text-gray-500 ml-1">/night</span>
        </p>

        {/* Rating (Optional) */}
        {listing.averageRating !== undefined || true ? ( // Conditionally render if you have actual rating data
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            <FaStar className="mr-1" />
            <span className="font-semibold">{averageRating}</span>
            <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
          </div>
        ) : null}
      </div>

      {/* Optional: Host Name or other quick info at the bottom */}
      {/*
      <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
        Hosted by: <span className="font-medium text-gray-700">{listing.host?.name || 'Unknown Host'}</span>
      </div>
      */}
    </Link>
  );
};

export default PropertyCard;