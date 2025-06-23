import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const { user, hydrated } = useSelector((state) => state.auth);

  if (!hydrated) return <div className="text-center p-10">Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  if (role === 'host' && !user.isHost) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
