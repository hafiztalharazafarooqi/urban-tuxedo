import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  };

  setInterval(() => {
    updateCartCount()
  }, 2000);

  useEffect(() => {
    updateCartCount();

    // Optional: Listen to the storage event to update the count if localStorage changes from another tab
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-serif text-2xl font-bold">
            Urban Tuxedo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <Link to="/category" className="hover:text-gold">
              Shop
            </Link>
            <Link to="/cart" className="relative hover:text-gold">
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to={localStorage.getItem("isLogin") ? "/profile" : "/login"}
              className="hover:text-gold"
            >
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
              <Link
                to={localStorage.getItem("isLogin") ? "/profile" : "/login"}
                className="hover:text-gold"
              >
                <FiUser className="text-xl" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
