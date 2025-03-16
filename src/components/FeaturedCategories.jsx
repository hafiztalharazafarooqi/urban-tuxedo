import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCategories(data.category);
    } catch (error) {
      console.warn(`Failed to fetch categories: ${error.message}`);
      setError("Failed to load categories. Please try again later.");
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Shop By Category
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Browse our curated collections to find exactly what you&apos;re
          looking for
        </p>

        {categories.length === 0 ? (
          <p className="text-red-500 w-full text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`category/${category.slug}`}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center text-sm font-medium text-white border-b border-white/50 pb-1 group-hover:border-white transition-all">
                    Explore Collection
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCategories;
