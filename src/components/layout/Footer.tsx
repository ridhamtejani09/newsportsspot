import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg p-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24" />
                  <path d="m14.83 9.17 4.24-4.24" />
                  <path d="m14.83 14.83 4.24 4.24" />
                  <path d="m9.17 14.83-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="font-bold text-2xl text-white">SportsSpot</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Find and book sports venues in your city with ease. Join teams and enjoy your favorite sports.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Book Venue</Link>
              </li>
              <li>
                <Link to="/team-hub" className="text-gray-400 hover:text-white transition-colors">Team Hub</Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Sports</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Football</Link>
              </li>
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Cricket</Link>
              </li>
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Pickleball</Link>
              </li>
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Volleyball</Link>
              </li>
              <li>
                <Link to="/book-venue" className="text-gray-400 hover:text-white transition-colors">Basketball</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SportsSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;