import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import { registerUser } from '../../store/slices/authSlice';
import Button from '../../components/Button'; // Assuming your Button component is styled well
import ErrorMessage from '../../components/ErrorMessage';
import { validateEmail, validatePassword } from '../../utils/ValidateForm'; // Corrected capitalization based on your import
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'; // Added icons

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isHost: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Helper to handle input changes and clear specific errors
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear specific error as user types, if the input becomes valid
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        if (name === 'email' && !validateEmail(newValue)) {
          // Keep error if still invalid
        } else if (name === 'password' && !validatePassword(newValue)) {
          // Keep error if still invalid
        } else if (name === 'name' && !newValue.trim()) {
          // Keep error if name is still empty
        } else {
          delete newErrors[name]; // Clear error if input is now valid
        }
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      name: formData.name.trim() ? '' : 'Name is required', // Trim name for validation
    };

    // Only set errors for currently invalid fields on submit
    const newFormErrors = {};
    if (errors.email) newFormErrors.email = errors.email;
    if (errors.password) newFormErrors.password = errors.password;
    if (errors.name) newFormErrors.name = errors.name;
    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).some((err) => err)) {
      return; // Stop if there are validation errors
    }

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
          <FaUserPlus className="text-purple-600" /> Create Account
        </h2>

        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaUser className="text-gray-400" />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out
                  ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                  text-gray-900 placeholder-gray-400 text-base`}
                aria-invalid={formErrors.name ? "true" : "false"}
                aria-describedby={formErrors.name ? "name-error" : null}
              />
            </div>
            {formErrors.name && (
              <p id="name-error" className="mt-1 text-red-600 text-sm animate-fade-in">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out
                  ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                  text-gray-900 placeholder-gray-400 text-base`}
                aria-invalid={formErrors.email ? "true" : "false"}
                aria-describedby={formErrors.email ? "email-error" : null}
              />
            </div>
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-red-600 text-sm animate-fade-in">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out
                  ${formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                  text-gray-900 placeholder-gray-400 text-base`}
                aria-invalid={formErrors.password ? "true" : "false"}
                aria-describedby={formErrors.password ? "password-error" : null}
              />
            </div>
            {formErrors.password && (
              <p id="password-error" className="mt-1 text-red-600 text-sm animate-fade-in">
                {formErrors.password}
              </p>
            )}
          </div>

          {/* Register as Host Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isHost"
              name="isHost"
              checked={formData.isHost}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="isHost" className="ml-2 block text-sm text-gray-900 cursor-pointer">
              Register as a Host (list your own properties)
            </label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3 text-lg font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              bg-purple-600 hover:bg-purple-700 text-white
              disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 ease-in-out"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </Button>
        </form>

        {/* Already Have Account Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200 ease-in-out">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;