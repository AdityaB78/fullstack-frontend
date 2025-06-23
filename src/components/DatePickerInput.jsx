import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Keep the base styles for functionality
import { FaCalendarAlt } from 'react-icons/fa'; // Import a calendar icon

const DatePickerInput = ({
  label,
  selected,
  onChange,
  minDate,
  maxDate, // Added maxDate prop for more control
  placeholderText, // Added placeholder text prop
  className = '', // Allow passing additional classes for the input
  disabled = false, // Added disabled prop
}) => {
  return (
    <div className="space-y-1">
      {label && ( // Conditionally render label
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate} // Pass maxDate
          placeholderText={placeholderText} // Pass placeholder
          disabled={disabled} // Pass disabled prop
          className={`
            w-full p-3 pl-10 border rounded-md shadow-sm
            placeholder-gray-400 text-gray-800
            focus:ring-indigo-500 focus:border-indigo-500
            transition duration-200 ease-in-out
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white border-gray-300'}
            ${className} // Apply any additional custom classes
          `}
          dateFormat="MMM d, yyyy" // Ensure consistent date format
          // Props to customize react-datepicker's internal elements
          calendarClassName="shadow-lg rounded-lg border-gray-200" // Add shadow/border to calendar
          dayClassName={() => "text-gray-800 rounded-full hover:bg-indigo-100 transition-colors"}
          monthClassName={() => "text-gray-800"}
          weekDayClassName={() => "text-gray-500 font-semibold"}
          popperClassName="z-50" // Ensure date picker pop-up is above other content
        />
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default DatePickerInput;