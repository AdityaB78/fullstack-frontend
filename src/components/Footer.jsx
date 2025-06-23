import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub, // Optional: if you want to link to your project's GitHub
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get current year

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Company Info / Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-extrabold text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            StayFinder
          </Link>
          <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
            Your premier platform for discovering unique accommodations and
            creating unforgettable travel experiences worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/listings" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                Explore Stays
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Host Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">For Hosts</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/host/create-listing" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                List Your Property
              </Link>
            </li>
            <li>
              <Link to="/host/dashboard" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                Host Dashboard
              </Link>
            </li>
            <li>
              <Link to="/host-guide" className="hover:text-indigo-400 transition-colors duration-200 text-gray-400">
                Host Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info (Optional - if you want physical contact details) */}
        {/*
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-indigo-400" />
              123 Stay St, Wanderland, Earth
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-3 text-indigo-400" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-3 text-indigo-400" />
              support@stayfinder.com
            </li>
          </ul>
        </div>
        */}
      </div>

      {/* Bottom Section: Socials and Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left pt-4">
        {/* Social Media Links */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-xl"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          {/* Optional GitHub Link */}
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} StayFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;