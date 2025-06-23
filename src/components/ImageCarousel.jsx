import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa'; // Import icons
import placeholder from '../assets/placeholder.png'; // Assuming a good placeholder image

// Custom Arrow Components for react-slick
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow left-4 z-10`} // Position arrow on the left, higher z-index
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <FaChevronLeft className="text-white text-3xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200" />
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow right-4 z-10`} // Position arrow on the right, higher z-index
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <FaChevronRight className="text-white text-3xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200" />
  </div>
);

const ImageCarousel = ({ images = [], altTextPrefix = 'Property Image' }) => { // Default to empty array for images
  // Determine images to display: either provided images or a single placeholder
  const imagesToDisplay = images && images.length > 0 ? images : [placeholder];

  const settings = {
    dots: true,
    infinite: imagesToDisplay.length > 1, // Only infinite if more than one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: imagesToDisplay.length > 1, // Only autoplay if more than one image
    autoplaySpeed: 3000,
    arrows: imagesToDisplay.length > 1, // Only show arrows if more than one image
    fade: true, // Adds a fading transition effect
    cssEase: "linear",
    // Custom arrows
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // Custom dots styling
    appendDots: dots => (
      <div style={{
        position: "absolute",
        bottom: "10px", // Position dots slightly higher
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s",
      }} />
    )
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl"> {/* Added shadow and overflow */}
      {imagesToDisplay.length === 0 ? (
        // Fallback for no images (should be caught by imagesToDisplay logic, but good for safety)
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 h-96 rounded-lg flex-col">
          <FaImage className="text-6xl mb-4" />
          <p className="text-lg font-semibold">No Images Available</p>
        </div>
      ) : (
        <Slider {...settings}>
          {imagesToDisplay.map((image, index) => (
            <div key={index} className="focus:outline-none"> {/* Add focus outline none */}
              <img
                src={image}
                alt={`${altTextPrefix} ${index + 1}`}
                className="w-full h-96 object-cover object-center" // Removed rounded-lg here as it's on parent div
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Custom Styles for react-slick dots - place these in your global CSS or inject via <style> tag for simplicity */}
    </div>
  );
};

export default ImageCarousel;