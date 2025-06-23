export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateListing = (listing) => {
  const errors = {};
  if (!listing.title) errors.title = 'Title is required';
  if (!listing.description) errors.description = 'Description is required';
  if (!listing.location) errors.location = 'Location is required';
  if (!listing.pricePerNight || listing.pricePerNight <= 0) errors.pricePerNight = 'Valid price is required';
  return errors;
};