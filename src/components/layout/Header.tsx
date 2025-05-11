import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Video } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <Video size={28} className="text-primary-600 mr-2" />
          <span className="text-xl font-bold text-primary-900">FeedMarketer</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-neutral-700 hover:text-primary-600'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-neutral-700 hover:text-primary-600'
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-neutral-700 hover:text-primary-600'
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-neutral-700 hover:text-primary-600'
              }`
            }
          >
            Contact
          </NavLink>
          <a 
            href="#" 
            className="btn btn-primary"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-base font-medium p-2 transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50 rounded-md' 
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => 
                `text-base font-medium p-2 transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50 rounded-md' 
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-base font-medium p-2 transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50 rounded-md' 
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-base font-medium p-2 transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50 rounded-md' 
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
            <a 
              href="#" 
              className="btn btn-primary w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;