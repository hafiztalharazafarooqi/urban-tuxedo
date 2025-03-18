import { useEffect, useState, useRef } from "react";
import { FiLogIn, FiMenu, FiShoppingCart, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [initial, setInitial] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLogin")
  );
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/category`);
        const data = await response.json();
        
        if (data.success && data.category) {
          // Process categories to create parent-child relationships
          const parentCategories = data.category.filter(cat => !cat.parentCategory);
          
          // Format parent categories and add their subcategories
          const formattedCategories = parentCategories.map(parentCat => {
            // Find all subcategories for this parent
            const childCategories = data.category.filter(
              cat => cat.parentCategory === parentCat.name
            );
            
            // Format parent category
            const formattedParent = {
              _id: parentCat._id,
              name: parentCat.name.charAt(0).toUpperCase() + parentCat.name.slice(1), // Capitalize first letter
              path: `/category/${parentCat.slug}`,
              slug: parentCat.slug,
              image: parentCat.image,
              description: parentCat.description,
              comingSoon: parentCat.comingSoon,
              subcategories: []
            };
            
            // Add formatted subcategories if any exist
            if (childCategories.length > 0) {
              formattedParent.subcategories = childCategories.map(childCat => ({
                _id: childCat._id,
                name: childCat.name.charAt(0).toUpperCase() + childCat.name.slice(1), // Capitalize first letter
                path: `/category/${childCat.slug}`,
                slug: childCat.slug,
                image: childCat.image,
                description: childCat.description,
                comingSoon: childCat.comingSoon
              }));
            }
            
            return formattedParent;
          });
          
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Close the category menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Replace setInterval with useEffect for better performance
  useEffect(() => {
    // Initial update
    updateCartCount();

    // Set up interval for periodic updates
    const interval = setInterval(() => {
      updateCartCount();
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("isLogin"));
    if (user) {
      setInitial(`${user?.user?.firstName?.charAt(0).toUpperCase()}${user?.user?.lastName?.charAt(0).toUpperCase()}`);
    } else {
      setInitial('');
    }
  }, [isLoggedIn]);

  // Toggle mobile subcategory expansion
  const toggleMobileSubcategory = (categoryId) => {
    if (expandedMobileCategory === categoryId) {
      setExpandedMobileCategory(null);
    } else {
      setExpandedMobileCategory(categoryId);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container-custom mx-auto px-6">
        <div className="flex justify-between items-center h-24">
          {/* Logo - centered brand design */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-red-100">
              <img src="https://i.ibb.co/fdFm1ZRT/1-removebg-preview.png" className="w-10 h-10 object-contain" alt="Urban Tuxedo" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-gray-800 hover:text-red-500 transition-colors">Urban Tuxedo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
              Home
            </Link>
            
            {/* Category Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button 
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors font-medium"
                onClick={() => setCategoryMenuOpen(!isCategoryMenuOpen)}
                aria-expanded={isCategoryMenuOpen}
                aria-haspopup="true"
              >
                Shop <FiChevronDown className="ml-1 transition-transform duration-200" style={{ transform: isCategoryMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute z-10 left-0 mt-3 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transform transition-all duration-200 ease-out opacity-100 scale-100">
                  {isLoading ? (
                    <div className="px-6 py-4 text-gray-500">Loading categories...</div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category._id} className="group relative hover:bg-red-50">
                        <Link
                          to={category.path}
                          className="block px-6 py-3 text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center justify-between"
                          onClick={(e) => {
                            // Only prevent default if there are subcategories
                            if (category.subcategories?.length > 0) {
                              e.preventDefault();
                            } else {
                              setCategoryMenuOpen(false);
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          {category.subcategories?.length > 0 && (
                            <FiChevronRight className="text-gray-400" />
                          )}
                          {category.comingSoon && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Soon</span>
                          )}
                        </Link>
                        
                        {/* Subcategories dropdown */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="absolute left-full top-0 hidden group-hover:block w-64 bg-white shadow-lg rounded-lg border border-gray-100">
                            <div className="py-2">
                              <div className="px-6 py-2 border-b border-gray-100 mb-1">
                                <span className="font-medium text-gray-800">{category.name}</span>
                              </div>
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory._id}
                                  to={subcategory.path}
                                  className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-between"
                                  onClick={() => setCategoryMenuOpen(false)}
                                >
                                  <span>{subcategory.name}</span>
                                  {subcategory.comingSoon && (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Soon</span>
                                  )}
                                </Link>
                              ))}
                              <Link
                                to={category.path}
                                className="block px-6 py-2.5 mt-1 border-t border-gray-100 text-sm font-medium text-red-500 hover:text-red-700"
                                onClick={() => setCategoryMenuOpen(false)}
                              >
                                View All {category.name}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-gray-500">No categories available</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right-side icons */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/cart"
              className="relative hover:text-red-500 text-gray-700 transition-colors group"
            >
              <FiShoppingCart size={22} className="transform group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="hover:text-red-500 transition-colors group"
            >
              {isLoggedIn ? (
                <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform border-2 border-white">
                  <span className="text-sm font-bold text-white">{initial}</span>
                </div>
              ) : (
                <FiLogIn size={22} className="text-gray-700 transform group-hover:scale-110 transition-transform" />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="container-custom mx-auto px-6 py-6 space-y-5">
            <Link
              to="/"
              className="block font-medium text-gray-700 hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <div className="font-medium text-gray-800">Shop by Category</div>
              {isLoading ? (
                <div className="pl-4 text-gray-500">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category._id} className="pl-2">
                    <div 
                      className="flex items-center justify-between py-2 hover:bg-red-50 px-2 rounded cursor-pointer"
                      onClick={() => category.subcategories?.length > 0 ? toggleMobileSubcategory(category._id) : null}
                    >
                      <Link
                        to={category.path}
                        className="text-gray-700 font-medium hover:text-red-500 transition-colors flex-1"
                        onClick={(e) => {
                          if (category.subcategories?.length > 0) {
                            e.preventDefault();
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        {category.name}
                        {category.comingSoon && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Soon</span>
                        )}
                      </Link>
                      {category.subcategories?.length > 0 && (
                        <button className="p-1 focus:outline-none">
                          <FiChevronDown 
                            className="transition-transform duration-200" 
                            style={{ transform: expandedMobileCategory === category._id ? 'rotate(180deg)' : 'rotate(0)' }} 
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile subcategories */}
                    {category.subcategories?.length > 0 && expandedMobileCategory === category._id && (
                      <div className="ml-4 mt-1 mb-3 border-l-2 border-red-100 pl-4 space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory._id}
                            to={subcategory.path}
                            className="block py-2 text-gray-600 hover:text-red-500 transition-colors text-sm flex items-center"
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{subcategory.name}</span>
                            {subcategory.comingSoon && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Soon</span>
                            )}
                          </Link>
                        ))}
                        <Link
                          to={category.path}
                          className="block py-2 text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          View All {category.name}
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="pl-4 text-gray-500">No categories available</div>
              )}
            </div>
            
            <Link
              to="/cart"
              className="flex items-center space-x-3 text-gray-700 hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FiShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-3 text-gray-700 hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isLoggedIn ? (
                <>
                  <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">{initial}</span>
                  </div>
                  <span>My Account</span>
                </>
              ) : (
                <>
                  <FiLogIn size={20} />
                  <span>Login / Register</span>
                </>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;