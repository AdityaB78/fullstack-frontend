import { useSelector, useDispatch } from 'react-redux';
import { setBookingDates, bookStay, clearBooking } from '../store/slices/bookingSlice';

const useBooking = (listingId) => {
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate, loading, error, booking } = useSelector((state) => state.booking);

  const submitBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      dispatch(setBookingDates({ error: 'Please select check-in and check-out dates' }));
      return;
    }
    await dispatch(bookStay({ listingId, checkInDate, checkOutDate }));
  };

  return {
    checkInDate,
    setCheckInDate: (date) => dispatch(setBookingDates({ checkInDate: date })),
    checkOutDate,
    setCheckOutDate: (date) => dispatch(setBookingDates({ checkOutDate: date })),
    loading,
    error,
    booking,
    submitBooking,
    clearBooking: () => dispatch(clearBooking()),
  };
};

export default useBooking;