/**
 * Mock data for StayFinder frontend components and services.
 * Simulates API responses for development and testing.
 */

import placeholder from './assets/placeholder.png';

// Mock user data for authentication and profile (used in Login, Register, Navbar, HostDashboard)
const mockUsers = [
  {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    isHost: false,
  },
  {
    _id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isHost: true,
  },
];

// Mock login/register response (used in authSlice, Login, Register)
const mockAuthResponse = {
  token: 'mock-jwt-token',
};

// Mock listings data (used in Home, ListingDetail, HostDashboard, CreateListing)
const mockListings = [
  {
    _id: 'listing1',
    title: 'Cozy Beachfront Cottage',
    description: 'A charming cottage with stunning ocean views, perfect for a relaxing getaway.',
    location: 'Malibu, CA',
    pricePerNight: 150,
    images: [
      placeholder,
      'https://example.com/image2.jpg',
    ],
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Air Conditioning'],
    host: {
      _id: 'user2',
      name: 'Jane Smith',
    },
  },
  {
    _id: 'listing2',
    title: 'Modern Downtown Loft',
    description: 'Spacious loft in the heart of the city with modern amenities.',
    location: 'New York, NY',
    pricePerNight: 200,
    images: [placeholder],
    amenities: ['WiFi', 'TV', 'Washer', 'Dryer'],
    host: {
      _id: 'user2',
      name: 'Jane Smith',
    },
  },
  {
    _id: 'listing3',
    title: 'Rustic Mountain Cabin',
    description: 'Secluded cabin surrounded by nature, ideal for hiking enthusiasts.',
    location: 'Aspen, CO',
    pricePerNight: 120,
    images: [placeholder],
    amenities: ['Kitchen', 'Parking', 'Pool'],
    host: {
      _id: 'user2',
      name: 'Jane Smith',
    },
  },
];

// Mock bookings data (used in Bookings, ListingDetail)
const mockBookings = [
  {
    _id: 'booking1',
    listing: {
      _id: 'listing1',
      title: 'Cozy Beachfront Cottage',
      location: 'Malibu, CA',
    },
    checkInDate: '2025-07-01',
    checkOutDate: '2025-07-05',
    totalPrice: 600,
    user: {
      _id: 'user1',
      name: 'John Doe',
    },
  },
  {
    _id: 'booking2',
    listing: {
      _id: 'listing2',
      title: 'Modern Downtown Loft',
      location: 'New York, NY',
    },
    checkInDate: '2025-08-10',
    checkOutDate: '2025-08-12',
    totalPrice: 400,
    user: {
      _id: 'user1',
      name: 'John Doe',
    },
  },
];

// Mock amenities options (used in CreateListing)
const mockAmenities = [
  'WiFi',
  'Kitchen',
  'Parking',
  'Air Conditioning',
  'Pool',
  'TV',
  'Washer',
  'Dryer',
];

// Mock API responses
const mockApiResponses = {
  // Simulates /api/login
  login: (email, password) => {
    const user = mockUsers.find((u) => u.email === email);
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    return { ...mockAuthResponse, user };
  },
  // Simulates /api/register
  register: (name, email, password, isHost) => {
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const newUser = { _id: `user${mockUsers.length + 1}`, name, email, isHost };
    mockUsers.push(newUser);
    return { ...mockAuthResponse, user: newUser };
  },
  // Simulates /api/me
  getProfile: () => {
    return mockUsers[0]; // Default to first user for simplicity
  },
  // Simulates /api/listings?location=
  getAllListings: (location = '') => {
    if (!location) return mockListings;
    return mockListings.filter((listing) =>
      listing.location.toLowerCase().includes(location.toLowerCase())
    );
  },
  // Simulates /api/listings/:id
  getListing: (id) => {
    const listing = mockListings.find((l) => l._id === id);
    if (!listing) throw new Error('Listing not found');
    return listing;
  },
  // Simulates /api/listings (POST)
  createListing: (listingData) => {
    const newListing = {
      ...listingData,
      _id: `listing${mockListings.length + 1}`,
      host: mockUsers.find((u) => u.isHost) || mockUsers[1],
    };
    mockListings.push(newListing);
    return newListing;
  },
  // Simulates /api/listings/:id (PUT)
  updateListing: (id, listingData) => {
    const index = mockListings.findIndex((l) => l._id === id);
    if (index === -1) throw new Error('Listing not found');
    mockListings[index] = { ...mockListings[index], ...listingData };
    return mockListings[index];
  },
  // Simulates /api/listings/:id (DELETE)
  deleteListing: (id) => {
    const index = mockListings.findIndex((l) => l._id === id);
    if (index === -1) throw new Error('Listing not found');
    mockListings.splice(index, 1);
    return { message: 'Listing deleted' };
  },
  // Simulates /api/bookings (POST)
  createBooking: (bookingData) => {
    const listing = mockListings.find((l) => l._id === bookingData.listingId);
    if (!listing) throw new Error('Listing not found');
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const newBooking = {
      _id: `booking${mockBookings.length + 1}`,
      listing: {
        _id: listing._id,
        title: listing.title,
        location: listing.location,
      },
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      totalPrice: days * listing.pricePerNight,
      user: mockUsers[0],
    };
    mockBookings.push(newBooking);
    return newBooking;
  },
  // Simulates /api/bookings/user
  getUserBookings: () => {
    return mockBookings.filter((b) => b.user._id === mockUsers[0]._id);
  },
};

export {
  mockUsers,
  mockAuthResponse,
  mockListings,
  mockBookings,
  mockAmenities,
  mockApiResponses,
};