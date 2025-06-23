import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getListing } from '../services/Api';
import { setBookingDates, bookStay, clearBooking } from '../store/slices/bookingSlice';
import ImageCarousel from '../components/ImageCarousel';
import DatePickerInput from '../components/DatePickerInput';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { formatPrice } from '../utils/PriceUtils';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate, loading, error: bookingError, booking } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListing(id);
        setListing(data);
      } catch (err) {
        if (err.isUnauthorized) navigate('/auth/login');
        setError('Failed to fetch listing');
      }
    };
    fetchListing();
    return () => dispatch(clearBooking());
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (booking) navigate('/bookings');
  }, [booking, navigate]);

  const handleBooking = () => {
    if (!user) return navigate('/auth/login');
    if (!checkInDate || !checkOutDate) {
      dispatch(setBookingDates({ error: 'Please select check-in and check-out dates' }));
      return;
    }
    dispatch(bookStay({ listingId: id, checkInDate, checkOutDate }));
  };

  const parsedCheckInDate = checkInDate ? new Date(checkInDate) : null;
  const parsedCheckOutDate = checkOutDate ? new Date(checkOutDate) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{listing?.title}</h1>
      {listing && <ImageCarousel images={listing.images} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-700">{listing?.description}</p>
          <p className="text-gray-600">Location: {listing?.location}</p>
          <p className="text-gray-600">Price: {formatPrice(listing?.pricePerNight)}/night</p>
          <p className="text-gray-600">Host: {listing?.host?.name}</p>
          <div>
            <h3 className="text-lg font-semibold">Amenities</h3>
            <ul className="list-disc list-inside text-gray-600">
              {listing?.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-6">Book Your Stay</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
              <DatePickerInput
                label="Check-in Date"
                selected={parsedCheckInDate}
                onChange={(date) => {
                  const nextDay = new Date(date);
                  nextDay.setDate(date.getDate() + 1);
                  const updatedCheckOut = !parsedCheckOutDate || parsedCheckOutDate <= date
                    ? nextDay.toISOString()
                    : checkOutDate;

                  dispatch(setBookingDates({
                    checkInDate: date.toISOString(),
                    checkOutDate: updatedCheckOut
                  }));
                }}
                minDate={new Date()}
              />
              <DatePickerInput
                label="Check-out Date"
                selected={parsedCheckOutDate}
                onChange={(date) => {
                  dispatch(setBookingDates({
                    checkOutDate: date.toISOString(),
                    checkInDate // pass string version of checkInDate
                  }));
                }}
                minDate={
                  parsedCheckInDate
                    ? new Date(parsedCheckInDate.getTime() + 24 * 60 * 60 * 1000)
                    : new Date()
                }
              />
              {error && <ErrorMessage message={error} />}
              {bookingError && <ErrorMessage message={bookingError} />}
              <Button type="submit" disabled={loading}>
                {loading ? 'Booking...' : 'Book Now'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
