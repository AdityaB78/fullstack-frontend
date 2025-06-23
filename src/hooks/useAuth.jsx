import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout, fetchUser } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    await dispatch(loginUser({ email, password })).unwrap();
  };

  const signup = async (name, email, password, isHost) => {
    await dispatch(registerUser({ name, email, password, isHost })).unwrap();
  };

  const fetchCurrentUser = async () => {
    if (token) {
      await dispatch(fetchUser()).unwrap();
    }
  };

  const signOut = () => {
    dispatch(signOut());
  };

  return { user, loading, error, login, signup, fetchCurrentUser, signOut };
};

export default useAuth;