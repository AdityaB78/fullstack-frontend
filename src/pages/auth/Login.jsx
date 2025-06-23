import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../store/slices/authSlice';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { validateEmail, validatePassword } from '../../utils/ValidateForm';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const validateFields = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(errors).filter(([_, v]) => v)
    );

    setFormErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      const revalidate = name === 'email' ? validateEmail(value) : validatePassword(value);
      if (!revalidate) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      const { user } = result.payload;
      if (user.isHost) {
        navigate('/host/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transition hover:shadow-3xl hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
          <FaSignInAlt className="text-indigo-600" /> Welcome Back!
        </h2>

        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2 rounded-md border shadow-sm text-base text-gray-900 placeholder-gray-400 transition
                  focus:ring-indigo-500 focus:border-indigo-500 
                  ${formErrors.email ? 'border-red-500 ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
              />
            </div>
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 animate-fade-in">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3 py-2 rounded-md border shadow-sm text-base text-gray-900 placeholder-gray-400 transition
                  focus:ring-indigo-500 focus:border-indigo-500
                  ${formErrors.password ? 'border-red-500 ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
                aria-invalid={!!formErrors.password}
                aria-describedby={formErrors.password ? 'password-error' : undefined}
              />
            </div>
            {formErrors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600 animate-fade-in">
                {formErrors.password}
              </p>
            )}
          </div>

          <div className="text-sm text-right">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500 font-medium transition">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3 text-lg font-semibold rounded-md shadow-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;