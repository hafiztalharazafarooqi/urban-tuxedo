import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

function Categories() {
  const { category } = useParams(); // category will be "formal-wear" in this case
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);


  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.warn(`Fetching products failed: ${error.message}`);
      setError("No products found.");

      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
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
  }, [products, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toLowerCase());
    }
    getProducts();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Our Collection</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn btn-primary flex items-center gap-2"
        >
          {showFilters ? <FiX /> : <FiFilter />}
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 space-y-6`}
        >
          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              {["All", "Formal Wear", "Casual Wear", "Accessories"].map(
                (category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.toLowerCase()}
                      checked={selectedCategory === category.toLowerCase()}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-serif text-lg mb-3">Price Range</h3>
            <div className="space-y-2">
              {[
                { label: "All", value: "all" },
                { label: "Under 25", value: "under-25" },
                { label: "25 - 35", value: "25-35" },
                { label: "Over 35", value: "over-35" },
              ].map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={range.value}
                    checked={priceRange === range.value}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-red-500 text-center w-full">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.images.primary}
                        alt="Product"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-2">£{item.price}</p>
                      <button className="btn btn-primary w-full">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
