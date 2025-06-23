import React from 'react';
import { FaGlobe, FaHouseUser, FaHeart } from 'react-icons/fa'; // Icons for visual appeal

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
        {/* Left Section: Image or Illustration */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center">
          {/* You can replace this with an actual image, e.g., <img src="/path/to/your/image.jpg" alt="About Us" className="rounded-lg shadow-lg" /> */}
          <div className="text-white text-center">
            <FaHouseUser className="text-7xl mb-4 mx-auto opacity-80" />
            <h3 className="text-3xl font-extrabold mb-2">Your Journey, Our Passion</h3>
            <p className="text-lg opacity-90">Connecting you with unforgettable stays.</p>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="md:w-1/2 p-8 sm:p-12 space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Discover <span className="text-indigo-600">StayFinder</span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            StayFinder is your premier destination for discovering **unique and unforgettable accommodations** around the globe. We believe every journey deserves a perfect stay, and we're dedicated to connecting travelers like you with properties that truly feel like a home away from home.
          </p>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start space-x-4">
              <FaGlobe className="text-3xl text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Explore Diverse Destinations</h3>
                <p className="text-gray-600">
                  From bustling city apartments to serene countryside retreats and adventurous mountain cabins, our curated listings span every corner of the world.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-4">
              <FaHeart className="text-3xl text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Hand-Picked Quality</h3>
                <p className="text-gray-600">
                  We meticulously vet each property to ensure high standards of comfort, cleanliness, and authenticity, guaranteeing a delightful experience.
                </p>
              </div>
            </div>

            {/* Feature 3 (Optional, if applicable) */}
            <div className="flex items-start space-x-4">
              <FaHouseUser className="text-3xl text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Seamless Booking Experience</h3>
                <p className="text-gray-600">
                  Our intuitive platform makes finding and booking your ideal stay effortless, so you can focus on planning your adventure.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed pt-4">
            Join the StayFinder community today and embark on your next unforgettable journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;