import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-montserrat font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-montserrat font-bold text-primary">
              CHASKIPRO
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-700 hover:text-primary font-inter font-medium transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="px-6 py-2 bg-secondary text-white rounded-lg font-inter font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/login"
              className="block w-full px-6 py-3 text-center text-gray-700 hover:bg-gray-50 rounded-lg font-inter font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="block w-full px-6 py-3 text-center bg-secondary text-white rounded-lg font-inter font-semibold hover:bg-orange-600 transition-all shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
