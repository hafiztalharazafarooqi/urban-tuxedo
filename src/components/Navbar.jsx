import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-serif text-2xl font-bold flex justify-center items-center gap-3">
            <img
              src="../../public/logo.png"
              alt="Urban Tuxedo"
              className="w-24 h-32 object-cover rounded-md"
            />
            Urban Tuxedo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <Link to="/categories" className="hover:text-gold">
              Shop
            </Link>
            <Link to="/cart" className="hover:text-gold">
              <FiShoppingCart className="text-xl" />
            </Link>
            <Link to="/login" className="hover:text-gold">
              <FiUser className="text-xl" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <Link to="/categories" className="hover:text-gold">
                Shop
              </Link>
              <Link to="/cart" className="hover:text-gold">
                Cart
              </Link>
              <Link to="/login" className="hover:text-gold">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
