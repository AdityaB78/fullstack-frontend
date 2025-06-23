import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { store } from './store';
import { fetchUser } from './store/slices/authSlice';

// Layouts & Pages
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import HostLayout from './layouts/HostLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ListingDetail from './pages/ListingDetail';
import HostDashboard from './pages/HostDashbaord';
import CreateListing from './pages/CreateListing';
import Bookings from './pages/Booking';

// 🔒 Protected route wrapper
import ProtectedRoute from './components/ProtectedRoute';

// 🚀 Load session if token exists
if (localStorage.getItem('token')) {
  store.dispatch(fetchUser());
}

// 📌 Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'listings/:id', element: <ListingDetail /> },
      { path: 'bookings', element: <Bookings /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
    ],
  },
  {
    path: '/host',
    element: <ProtectedRoute requiredRole="host" />, // ✅ Guarded by host check
    children: [
      {
        path: '',
        element: <HostLayout />,
        children: [
          { path: 'dashboard', element: <HostDashboard /> },
          { path: 'create-listing', element: <CreateListing /> },
          { path: 'edit-listing/:id', element: <CreateListing /> },
        ],
      },
    ],
  },
]);

// 🚀 Mount the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
