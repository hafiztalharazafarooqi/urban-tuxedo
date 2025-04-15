import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

function Categories() {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategoryData, setCurrentCategoryData] = useState(null);
  const [categoryTree, setCategoryTree] = useState([]);

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

  const getCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      // Create a flat list of all categories with proper mappings
      const formattedCategory = [
        { id: "all", name: "All", slug: "all" }, // Ensure this is the first item
        ...data.category.map((category) => ({
          id: category._id,
          name: category.name,
          slug: category.slug,
          parentCategory: category.parentCategory,
          comingSoon: category.comingSoon || false,
        })),
      ];

      setCategoryList(formattedCategory);

      // Create tree structure
      const buildCategoryTree = () => {
        // Find root level categories (those with no parent or parent is null)
        const rootCategories = [
          { id: "all", name: "All", slug: "all" }, // Always include "All" at the root
          ...data.category
            .filter((cat) => !cat.parentCategory)
            .map((cat) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug,
              comingSoon: cat.comingSoon || false,
              parentCategory: null,
              children: [],
            })),
        ];

        // Find children for each parent category
        rootCategories.forEach((parent) => {
          if (parent.id !== "all") {
            // Skip "All" category
            parent.children = data.category
              .filter((cat) => cat.parentCategory === parent.id)
              .map((child) => ({
                id: child._id,
                name: child.name,
                slug: child.slug,
                comingSoon: child.comingSoon || false,
                parentCategory: child.parentCategory,
              }));
          }
        });

        return rootCategories;
      };

      setCategoryTree(buildCategoryTree());
    } catch (error) {
      console.warn(`Failed to fetch categories: ${error.message}`);
      setError("Failed to load categories. Please try again later.");
    }
  };
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) =>
        item?.category?.includes(selectedCategory)
      );
    }

    // Update current category data
    const currentCategory = categoryList.find(
      (cat) => cat.slug === selectedCategory
    );
    setCurrentCategoryData(currentCategory);
    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, categoryList]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toLowerCase());
    }
    getProducts();
    getCategories();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Function to check if we should display "Coming Soon"
  const shouldShowComingSoon = () => {
    return (
      currentCategoryData &&
      currentCategoryData.comingSoon === true &&
      filteredProducts.length === 0
    );
  };

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
          <div className="space-y-2">
            {categoryTree.map((category) => (
              <div key={category.id}>
                {/* Parent category */}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={selectedCategory === category.slug}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  {category.name}
                </label>

                {/* Child categories (indented) */}
                {category.children && category.children.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.children.map((child) => (
                      <label key={child.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={child.slug}
                          checked={selectedCategory === child.slug}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2"
                        />
                        {child.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
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

          {/* Products or Coming Soon message */}
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
          ) : shouldShowComingSoon() ? (
            <div className="flex flex-col items-center justify-center w-full py-16">
              <h2 className="text-3xl font-serif text-center mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                We&apos;re working on adding products to this category. Please
                check back later or explore our other collections.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-red-500 text-center w-full">
              {error || "No products found in this category."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.images.primary}
                        alt="Product"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg mb-2 truncate">
                        {item.title}
                      </h3>
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
