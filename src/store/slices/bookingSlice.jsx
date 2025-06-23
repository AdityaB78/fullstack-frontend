import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking } from '../../services/api';

// Async thunk to handle booking creation
export const bookStay = createAsyncThunk(
  'booking/bookStay',
  async ({ listingId, checkInDate, checkOutDate }, { rejectWithValue }) => {
    try {
      const booking = await createBooking({ listingId, checkInDate, checkOutDate });
      return booking;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Booking failed');
    }
  }
);

const initialState = {
  checkInDate: null,
  checkOutDate: null,
  loading: false,
  error: null,
  booking: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDates: (state, action) => {
      if ('checkInDate' in action.payload) {
        state.checkInDate = action.payload.checkInDate;
      }
      if ('checkOutDate' in action.payload) {
        state.checkOutDate = action.payload.checkOutDate;
      }
      if ('error' in action.payload) {
        state.error = action.payload.error;
      } else {
        state.error = null;
      }
    },
    clearBooking: (state) => {
      state.checkInDate = null;
      state.checkOutDate = null;
      state.error = null;
      state.booking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookStay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookStay.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(bookStay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong during booking.';
      });
  },
});

export const { setBookingDates, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
