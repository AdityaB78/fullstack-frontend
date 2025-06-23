import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getListing, createListing, updateListing } from '../services/Api';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import {
  FaCheckCircle, FaEdit, FaHome, FaInfoCircle, FaPlus, FaTrash, FaSpinner,
  FaDollarSign, FaTv, FaTshirt, FaWifi, FaUtensils, FaParking,
  FaThermometerHalf, FaSwimmingPool, FaHotTub
} from 'react-icons/fa';

const amenityIcons = {
  WiFi: FaWifi,
  Kitchen: FaUtensils,
  Parking: FaParking,
  'Air Conditioning': FaThermometerHalf,
  Pool: FaSwimmingPool,
  TV: FaTv,
  Washer: FaTshirt,
  Dryer: FaHotTub,
};

const defaultFormData = {
  title: '',
  description: '',
  location: '',
  pricePerNight: '',
  images: [''],
  amenities: [],
};

const CreateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [mode, setMode] = useState('form'); // 'form' or 'success'

  const fetchListing = useCallback(async () => {
    if (!id) return;
    setInitialLoading(true);
    try {
      const data = await getListing(id);
      if (data.host._id !== user._id) return navigate('/host');
      setFormData({
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        pricePerNight: data.pricePerNight || '',
        images: data.images?.length ? data.images : [''],
        amenities: data.amenities || [],
      });
    } catch (err) {
      console.error(err);
      setApiError('Failed to load listing. Please try again.');
    } finally {
      setInitialLoading(false);
    }
  }, [id, user, navigate]);

  useEffect(() => {
    if (!user) return navigate('/auth/login');
    if (id) fetchListing();
    else setInitialLoading(false);
  }, [id, user, navigate, fetchListing]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    updateField('images', newImages);
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    updateField('amenities',
      checked ? [...formData.amenities, value] : formData.amenities.filter(a => a !== value)
    );
  };

  const validateListing = (data) => {
    const errors = {};
    if (!data.title.trim()) errors.title = 'Title is required';
    if (!data.description.trim()) errors.description = 'Description is required';
    if (!data.location.trim()) errors.location = 'Location is required';
    if (!data.pricePerNight || isNaN(data.pricePerNight)) errors.pricePerNight = 'Enter a valid price';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleaned = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      images: formData.images.map((img) => img.trim()).filter(Boolean),
    };

    const errors = validateListing(cleaned);
    setFormErrors(errors);
    if (Object.keys(errors).length) return setApiError('');

    setLoading(true);
    setApiError('');
    try {
      id ? await updateListing(id, cleaned) : await createListing(cleaned);
      setMode('success');
      setTimeout(() => navigate('/host/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setApiError(err.response?.status === 401 ? navigate('/auth/login') : 'Failed to save listing.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-indigo-500" />
      </div>
    );
  }

  if (mode === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">
            Listing {id ? 'successfully edited!' : 'successfully created!'}
          </h2>
          <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-3">
          {id ? <><FaEdit /> Edit Listing</> : <><FaHome /> Create Listing</>}
        </h1>

        {apiError && <ErrorMessage message={apiError} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {['title', 'description', 'location'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block font-semibold text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'description' ? (
                <textarea id={field} name={field} rows={5} value={formData[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className={`w-full p-3 border rounded-md ${formErrors[field] ? 'border-red-500' : 'border-gray-300'}`} />
              ) : (
                <input id={field} name={field} value={formData[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className={`w-full p-3 border rounded-md ${formErrors[field] ? 'border-red-500' : 'border-gray-300'}`} />
              )}
              {formErrors[field] && <p className="text-red-600 text-sm mt-1"><FaInfoCircle className="inline mr-1" /> {formErrors[field]}</p>}
            </div>
          ))}

          {/* Price Field */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Price per Night</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaDollarSign />
              </span>
              <input
                type="number" name="pricePerNight" value={formData.pricePerNight} onChange={(e) => updateField('pricePerNight', e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border rounded-md ${formErrors.pricePerNight ? 'border-red-500' : 'border-gray-300'}`} />
            </div>
            {formErrors.pricePerNight && <p className="text-red-600 text-sm mt-1"><FaInfoCircle className="inline mr-1" /> {formErrors.pricePerNight}</p>}
          </div>

          {/* Images */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Images (URLs)</label>
            {formData.images.map((img, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <input type="text" value={img} onChange={(e) => handleImageChange(idx, e.target.value)}
                  className="flex-grow p-2 border rounded-md" />
                {formData.images.length > 1 && (
                  <button type="button" onClick={() => updateField('images', formData.images.filter((_, i) => i !== idx))} className="text-red-500">
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => updateField('images', [...formData.images, ''])} className="text-sm text-green-600">
              <FaPlus className="inline mr-1" /> Add Image URL
            </button>
          </div>

          {/* Amenities */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(amenityIcons).map((a) => {
                const Icon = amenityIcons[a];
                return (
                  <label key={a} className="flex items-center">
                    <input
                      type="checkbox" value={a} checked={formData.amenities.includes(a)}
                      onChange={handleAmenitiesChange} className="mr-2" />
                    <Icon className="text-gray-600 mr-1" />
                    {a}
                  </label>
                );
              })}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> {id ? 'Updating...' : 'Creating...'}
              </span>
            ) : id ? 'Update Listing' : 'Create Listing'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
