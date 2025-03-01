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
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featureProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="group"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={item.image.primary}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">${item.price}</p>
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
    </section>
  );
}

export default FeaturedProducts;
