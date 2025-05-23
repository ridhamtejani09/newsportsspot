import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, History, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">
              SportsSpot
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/book-venue" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Book Venue
            </Link>
            <Link to="/team-hub" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Team Hub
            </Link>
            <Link to="/contact-us" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact Us
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center">
                <Shield size={16} className="mr-1" />
                Admin Panel
              </Link>
            )}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <User size={16} className="mr-2" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile/bookings')}>
                    <History className="mr-2 h-4 w-4" />
                    <span>Booking History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button 
                  variant="default" 
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-transform hover:scale-105"
                >
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-600 font-medium p-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/book-venue" 
                className="text-gray-700 hover:text-purple-600 font-medium p-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Venue
              </Link>
              <Link 
                to="/team-hub" 
                className="text-gray-700 hover:text-purple-600 font-medium p-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Team Hub
              </Link>
              <Link 
                to="/contact-us" 
                className="text-gray-700 hover:text-purple-600 font-medium p-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-gray-700 hover:text-purple-600 font-medium p-2 rounded-md hover:bg-gray-50 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield size={16} className="mr-1" />
                  Admin Panel
                </Link>
              )}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center p-2">
                    <User size={16} className="mr-2" />
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-purple-600 p-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/profile/bookings" 
                    className="text-gray-700 hover:text-purple-600 p-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Booking History
                  </Link>
                  <Link 
                    to="/profile/settings" 
                    className="text-gray-700 hover:text-purple-600 p-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="default" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;