import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import QuickViewModal from "./QuickViewModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLogin"));
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const megaMenuRef = useRef(null);
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const isHomePage = location.pathname === "/";

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/category`);
        const data = await response.json();
        
        if (data.success && data.category) {
          const parentCategories = data.category.filter(cat => !cat.parentCategory);
          const formattedCategories = parentCategories.map(parentCat => {
            const childCategories = data.category.filter(
              cat => cat.parentCategory === parentCat.name
            );
            
            return {
              _id: parentCat._id,
              name: parentCat.name.charAt(0).toUpperCase() + parentCat.name.slice(1),
              path: `/category/${parentCat.slug}`,
              slug: parentCat.slug,
              image: parentCat.image,
              comingSoon: parentCat.comingSoon,
              subcategories: childCategories.map(childCat => ({
                _id: childCat._id,
                name: childCat.name.charAt(0).toUpperCase() + childCat.name.slice(1),
                path: `/category/${childCat.slug}`,
                slug: childCat.slug,
                comingSoon: childCat.comingSoon
              }))
            };
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
  }, [BACKEND_URL]);

  // Fetch products once for fast client-side searching
  useEffect(() => {
    const fetchProductsForSearch = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products`);
        const data = await response.json();
        if (data && data.products) {
          setAllProducts(data.products);
        }
      } catch (e) {
        console.warn("Failed to fetch products for search cache", e);
      }
    };
    fetchProductsForSearch();
  }, [BACKEND_URL]);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync cart count
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 1500);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  // Filter search items
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = allProducts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
    setSearchResults(matches.slice(0, 5));
  }, [searchQuery, allProducts]);

  // Sync Auth State
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("isLogin"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation classes
  const isDarkNavbar = isHomePage && !isScrolled;
  const navBgClass = isDarkNavbar
    ? "bg-transparent text-white border-b border-white/10"
    : "bg-white/95 text-primary shadow-sm border-b border-gray-100 backdrop-blur-md";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${navBgClass}`}>
        <div className="container-custom py-5 md:py-6">
          <div className="flex justify-between items-center h-12">
            
            {/* Left Menu (Categories / Mega Menu trigger) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-xs tracking-widest font-semibold uppercase hover:text-accent transition-colors duration-300">
                Home
              </Link>
              
              {/* Shop / Mega Menu trigger */}
              <div 
                className="relative" 
                ref={megaMenuRef}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                <button
                  className="flex items-center text-xs tracking-widest font-semibold uppercase hover:text-accent transition-colors duration-300 gap-1.5 focus:outline-none"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                >
                  Shop <FiChevronDown size={12} className={`transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div 
                    className="absolute left-0 mt-6 w-[80vw] max-w-[900px] bg-white text-primary shadow-2xl border border-gray-100 p-8 grid grid-cols-4 gap-8 animate-fade-in z-50"
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    {isLoading ? (
                      <div className="col-span-4 text-center py-6 text-xs text-gray-400 uppercase tracking-widest">
                        Loading collections...
                      </div>
                    ) : categories.length > 0 ? (
                      <>
                        {categories.slice(0, 3).map((parent) => (
                          <div key={parent._id} className="space-y-4">
                            <Link 
                              to={parent.path} 
                              className="font-serif text-sm font-semibold tracking-wide text-primary hover:text-accent transition-colors block border-b border-gray-100 pb-2"
                              onClick={() => setIsMegaMenuOpen(false)}
                            >
                              {parent.name}
                            </Link>
                            
                            {parent.subcategories?.length > 0 && (
                              <div className="flex flex-col space-y-2">
                                {parent.subcategories.map((sub) => (
                                  <Link
                                    key={sub._id}
                                    to={sub.path}
                                    onClick={() => setIsMegaMenuOpen(false)}
                                    className="text-xs text-gray-500 hover:text-accent transition-colors py-0.5"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Featured Mega Menu Card */}
                        {/* <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col justify-between h-full">
                          <div>
                            <span className="text-[9px] tracking-widest text-accent font-bold uppercase block mb-1">
                              Collection
                            </span>
                            <h4 className="font-serif text-xs font-bold text-primary mb-2">
                              The Wedding Edit
                            </h4>
                            <p className="text-[10px] text-gray-400 leading-normal">
                              Perfect fits tailored for your special day. Signature suits & accessories.
                            </p>
                          </div>
                          <Link
                            to="/category/weddings"
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="text-[10px] tracking-widest font-semibold uppercase text-primary hover:text-accent transition-colors mt-4 inline-flex items-center gap-1.5"
                          >
                            Explore Suitings
                          </Link>
                        </div> */}
                      </>
                    ) : (
                      <div className="col-span-4 text-center py-6 text-xs text-gray-400">
                        No collections available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Logo - Centered */}
            <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-accent/25 bg-white p-0.5">
                  <img src="https://i.ibb.co/fdFm1ZRT/1-removebg-preview.png" className="w-full h-full object-contain" alt="Urban Tuxedo" />
                </div>
                <span className="font-serif text-[19px] md:text-[22px] font-bold tracking-[0.1em] uppercase">
                  Urban Tuxedo
                </span>
              </Link>
            </div>

            {/* Right Icons (Search, Profile, Cart) */}
            <div className="flex items-center space-x-6">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-accent transition-colors duration-300 p-1"
                aria-label="Search items"
              >
                <FiSearch size={19} />
              </button>

              {/* Profile */}
              <Link
                to="/profile"
                className="hover:text-accent transition-colors duration-300 p-1 hidden md:block"
                aria-label="My account"
              >
                <FiUser size={19} />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-accent transition-colors duration-300 p-1 flex items-center"
                aria-label="Open cart"
              >
                <FiShoppingCart size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden hover:text-accent transition-colors duration-300 p-1"
                aria-label="Menu"
              >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-8 flex flex-col space-y-6 md:hidden">
          <Link
            to="/"
            className="font-serif text-lg text-primary tracking-wide border-b border-gray-100 pb-3"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          <div className="space-y-4">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400">
              Collections
            </span>
            <div className="flex flex-col space-y-3 pl-2">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={cat.path}
                  className="text-sm text-primary hover:text-accent font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-2 text-primary font-serif text-base border-t border-gray-100 pt-6"
            onClick={() => setIsOpen(false)}
          >
            <FiUser size={18} />
            <span>My Account</span>
          </Link>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Premium Full-Screen Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in text-white">
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="absolute top-8 right-8 p-3 text-white/60 hover:text-white border border-white/10 hover:border-white transition-colors duration-300"
            aria-label="Close search"
          >
            <FiX size={22} />
          </button>

          <div className="w-full max-w-2xl text-center space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
                Discover
              </span>
              <h2 className="font-serif text-3xl font-light">What are you looking for?</h2>
            </div>
            
            <div className="relative border-b border-white/20 focus-within:border-accent transition-colors duration-300">
              <input
                type="text"
                placeholder="Search tuxedos, wedding suits, blazers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none py-4 text-center text-xl font-light tracking-wide text-white placeholder-white/35 focus:ring-0"
                autoFocus
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45" size={20} />
            </div>

            {/* Popular Searches */}
            {searchQuery === "" && (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/45">
                  Popular Searches
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Tuxedo", "Suit", "Blazer", "Accessories", "Wedding"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-accent hover:text-primary hover:border-accent text-xs tracking-wider transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Results Grid */}
            {searchResults.length > 0 && (
              <div className="bg-white/5 border border-white/10 p-6 text-left space-y-4 max-h-[350px] overflow-y-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                  Found {searchResults.length} matches
                </span>
                <div className="space-y-4">
                  {searchResults.map((prod) => (
                    <div key={prod._id} className="flex gap-4 items-center justify-between pb-3 border-b border-white/5 last:border-b-0">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-12 overflow-hidden bg-white/10">
                          <img src={prod.images?.primary} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-semibold hover:text-accent transition-colors">
                            <Link
                              to={`/product/${prod._id}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              {prod.title}
                            </Link>
                          </h4>
                          <p className="text-[10px] text-white/50">{prod.category || " menswear"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                          setQuickViewProduct(prod);
                        }}
                        className="text-xs text-accent hover:underline uppercase tracking-wider font-semibold"
                      >
                        Quick Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery !== "" && searchResults.length === 0 && (
              <p className="text-white/40 text-sm">No items match your search. Try another query.</p>
            )}
          </div>
        </div>
      )}

      {/* Floating Quick View Modal inside Navbar */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onCartUpdated={updateCartCount}
        />
      )}
    </>
  );
}

export default Navbar;