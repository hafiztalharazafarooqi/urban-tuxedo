import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [featureProducts, setFeatureProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setFeatureProducts(data.products.filter((item) => item.isFeatured));
      setLoading(false);
    } catch (error) {
      console.warn(`Failed to fetch products: ${error.message}`);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Featured Collection
            </h2>
            <p className="text-gray-600 mt-2">
              Discover our most coveted pieces
            </p>
          </div>
          <Link
            to="/category"
            className="hidden md:flex items-center text-red-500 font-medium hover:text-red-700 transition"
          >
            View all products
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>

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
        ) : featureProducts.length === 0 ? (
          <p className="text-red-500 text-center w-full">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureProducts.map((product) => (
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
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition duration-300">
                      <p className="text-white font-medium">View Details</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-red-500 transition">
                        {product.title}
                      </h3>
                      <p className="text-red-500 text-lg font-bold">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/category"
            className="inline-flex items-center text-red-500 font-medium hover:text-red-700 transition"
          >
            View all products
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
