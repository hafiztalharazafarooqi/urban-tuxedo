import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiFilter, FiX, FiChevronRight } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

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
  const [selectedQuickView, setSelectedQuickView] = useState(null);

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

      const formattedCategory = [
        { id: "all", name: "All Collections", slug: "all" },
        ...data.category.map((cat) => ({
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          parentCategory: cat.parentCategory,
          comingSoon: cat.comingSoon || false,
        })),
      ];

      setCategoryList(formattedCategory);

      const buildCategoryTree = () => {
        const rootCategories = [
          { id: "all", name: "All Garments", slug: "all" },
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

        rootCategories.forEach((parent) => {
          if (parent.id !== "all") {
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

  const shouldShowComingSoon = () => {
    return (
      currentCategoryData &&
      currentCategoryData.comingSoon === true &&
      filteredProducts.length === 0
    );
  };

  return (
    <div className="bg-brandBg min-h-screen pt-24 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-primary text-white py-16 mb-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600')" }} />
        <div className="container-custom relative z-10 text-center space-y-3.5">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">
            Urban Tuxedo
          </span>
          <h1 className="font-serif text-3xl md:text-5xl tracking-wide font-light">
            {currentCategoryData ? currentCategoryData.name : "Sartorial Collections"}
          </h1>
          <p className="text-xs text-gray-300 max-w-md mx-auto font-light leading-relaxed">
            Discover precision cuts, premium materials, and timeless structures detailed for luxury menswear.
          </p>
        </div>
      </div>

      <div className="container-custom">
        {/* Mobile controls */}
        <div className="md:hidden flex justify-between items-center bg-white border border-gray-100 p-4 mb-6 shadow-sm">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary"
          >
            {showFilters ? <FiX size={16} /> : <FiFilter size={16} />}
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-none bg-transparent text-xs uppercase tracking-widest font-bold text-primary focus:ring-0 py-1"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* 2. Filters Sidebar */}
          <div
            className={`w-full md:w-64 flex-shrink-0 space-y-8 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm sticky top-28">
              <h3 className="font-serif text-sm font-semibold tracking-wider text-primary uppercase border-b border-gray-100 pb-3">
                Collections
              </h3>

              <div className="space-y-4">
                {categoryTree.map((cat) => (
                  <div key={cat.id} className="space-y-2.5">
                    {/* Parent Category Option */}
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.slug}
                        checked={selectedCategory === cat.slug}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          if (window.innerWidth < 768) setShowFilters(false);
                        }}
                        className="h-3.5 w-3.5 text-accent border-gray-300 focus:ring-accent accent-accent"
                      />
                      <span className={`ml-3 text-xs tracking-wider uppercase font-medium transition-colors ${
                        selectedCategory === cat.slug ? "text-accent font-semibold" : "text-gray-500 group-hover:text-primary"
                      }`}>
                        {cat.name}
                      </span>
                    </label>

                    {/* Children Category Options */}
                    {cat.children && cat.children.length > 0 && (
                      <div className="pl-6 flex flex-col space-y-2 border-l border-gray-100">
                        {cat.children.map((child) => (
                          <label key={child.id} className="flex items-center group cursor-pointer">
                            <input
                              type="radio"
                              name="category"
                              value={child.slug}
                              checked={selectedCategory === child.slug}
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                if (window.innerWidth < 768) setShowFilters(false);
                              }}
                              className="h-3 w-3 text-accent border-gray-300 focus:ring-accent accent-accent"
                            />
                            <span className={`ml-3 text-[11px] tracking-wider transition-colors ${
                              selectedCategory === child.slug ? "text-accent font-semibold" : "text-gray-400 group-hover:text-primary"
                            }`}>
                              {child.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Products Grid Area */}
          <div className="flex-1 space-y-6">
            
            {/* Desktop Sorting header */}
            <div className="hidden md:flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                Showing {filteredProducts.length} Items
              </span>

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary focus:ring-accent focus:border-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Main grid loader / elements */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-gray-100 p-4">
                    <div className="bg-gray-100 aspect-[3/4] mb-4" />
                    <div className="h-4 bg-gray-100 w-1/3 mx-auto mb-2" />
                    <div className="h-4 bg-gray-100 w-2/3 mx-auto mb-2" />
                    <div className="h-4 bg-gray-100 w-1/4 mx-auto" />
                  </div>
                ))}
              </div>
            ) : shouldShowComingSoon() ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 text-center px-6">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold mb-3 block">
                  Collection Pipeline
                </span>
                <h2 className="font-serif text-2xl text-primary mb-3">
                  Coming Soon
                </h2>
                <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">
                  We are currently hand-crafting new garments for this signature collection. Please check back shortly or explore our active catalogs.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 text-center px-6">
                <p className="text-gray-400 text-xs mb-4">
                  {error || "No tailoring found matching this selection."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((item) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    onQuickView={(p) => setSelectedQuickView(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Quick View Modal Overlay */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}

export default Categories;
