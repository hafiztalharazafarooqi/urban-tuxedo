import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Filter, X, ChevronDown, Sliders } from "lucide-react";

function Categories() {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toLowerCase());
    }
    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, priceRange, sortBy, products]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://urban-tuxedo-backend.vercel.app/api/products",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.warn(`Fetching products failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => 
        item.categories.toLowerCase()?.includes(selectedCategory?.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter((item) => {
        const price = item.price;
        if (priceRange === "under-25") return price < 25;
        if (priceRange === "25-35") return price >= 25 && price <= 35;
        if (priceRange === "over-35") return price > 35;
        return true;
      });
    }

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };

  // Category mapping for display names
  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Formal Wear", value: "formal wear" },
    { label: "Casual Wear", value: "casual wear" },
    { label: "Accessories", value: "accessories" }
  ];

  // Price range options
  const priceOptions = [
    { label: "All Prices", value: "all" },
    { label: "Under $25", value: "under-25" },
    { label: "$25 - $35", value: "25-35" },
    { label: "Over $35", value: "over-35" }
  ];

  // Sort options
  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Newest Arrivals", value: "newest" }
  ];

  // Get current category display name
  const getCurrentCategoryName = () => {
    const found = categoryOptions.find(cat => cat.value === selectedCategory);
    return found ? found.label : "Our Collection";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Banner */}
      <div className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">{getCurrentCategoryName()}</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse our curated selection of premium quality products designed for style and comfort
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filter Bar - Mobile Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 shadow-sm"
          >
            {showFilters ? <X size={16} /> : <Filter size={16} />}
            Filters
          </button>
          
          {/* Sort Dropdown - Desktop */}
          <div className="hidden md:block relative">
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <Sliders size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-500">Sort By</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 pr-8 appearance-none bg-transparent border-none focus:outline-none text-sm font-medium"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Panel */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-4`}
          >
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
              <div className="space-y-3">
                {categoryOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={selectedCategory === option.value}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 h-4 w-4 accent-red-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Price Range</h3>
              <div className="space-y-3">
                {priceOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={option.value}
                      checked={priceRange === option.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-3 h-4 w-4 accent-red-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Sort (visible only on mobile) */}
            <div className="md:hidden mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Sort By</h3>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="mr-3 h-4 w-4 accent-red-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(false)}
              className="w-full py-2 bg-red-500 text-white rounded-lg md:hidden">
              Apply Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200 h-64"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image.primary}
                          alt={product.title}
                          className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition duration-300">
                          <p className="text-white font-medium text-sm">View Details</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-medium text-gray-800 group-hover:text-red-500 transition line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-red-500 font-bold">
                            ${product.price}
                          </p>
                        </div>
                        
                        <div className="mt-3 text-center">
                          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-xs font-medium">
                            Shop Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-red-500 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters to find what you&apos;re looking for
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange("all");
                    setSortBy("featured");
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;