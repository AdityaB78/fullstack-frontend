import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllListings } from '../services/api';
import { debounce } from '../utils/Debounce';

const useListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  // useCallback ensures debounce is stable across renders
  const fetchListings = useCallback(
    debounce(async (loc) => {
      setLoading(true);
      try {
        const data = await getAllListings(loc);
        // Normalize in case API returns { listings: [...] }
        const resolvedListings = Array.isArray(data) ? data : data.listings || [];
        setListings(resolvedListings);
        setError('');
      } catch (err) {
        if (err.isUnauthorized) {
          navigate('/auth/login');
        }
        setError('Failed to fetch listings');
        setListings([]); // optional: clear listings on error
      } finally {
        setLoading(false);
      }
    }, 300),
    [navigate] // memoize only if navigate changes
  );

  // trigger debounced fetch when location changes
  useEffect(() => {
    fetchListings(location);
  }, [location, fetchListings]);

  return { listings, loading, error, setLocation };
};

export default useListings;
