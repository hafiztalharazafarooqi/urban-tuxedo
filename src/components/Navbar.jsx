import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogIn } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLogin")
  );

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  };

  // Replace setInterval with useEffect for better performance
  useEffect(() => {
    // Initial update
    updateCartCount();

    // Set up interval for periodic updates
    const interval = setInterval(() => {
      updateCartCount();
      // isUserLoggedIn = !!localStorage.getItem("isLogin");
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("isLogin"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold">
            Urban Tuxedo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link
              to="/category"
              className="hover:text-red-500 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="relative hover:text-red-500 transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="hover:text-red-500 transition-colors"
            >
              {isLoggedIn ? (
                // <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                //   <span className="text-3xl font-bold text-red-500">JD</span>
                // </div>
                <FiUser size={20} />
              ) : (
                <FiLogIn size={20} />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="container-custom mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/category"
              className="block hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="block hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cart{" "}
              {cartCount > 0 && (
                <span className="ml-2 bg-gold text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="block hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
