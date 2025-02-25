import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://urban-tuxedo-backend.vercel.app/api/products",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
      setFeatureProducts(data.products.filter((item) => item.isFeatured));
      console.log(response);
    } catch (error) {
      console.warn(`Login failed: ${error.message}`);
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Elegance Redefined</h1>
            <p className="text-xl mb-8">
              Discover our premium collection of handcrafted tuxedos and formal
              wear.
            </p>
            <Link to="/category" className="btn btn-gold">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* {["Formal Wear", "Casual Wear", "Accessories"].map((category) => ( */}
            <Link to={`/category/Formal Wear`}>
              <div className="group relative h-96 overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/8605790/pexels-photo-8605790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  alt={"Formal Wear"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif">
                    {"Formal Wear"}
                  </h3>
                </div>
              </div>
            </Link>
            <Link to={`/category/Casual Wear`}>
              <div className="group relative h-96 overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/30839459/pexels-photo-30839459/free-photo-of-confident-man-in-black-suit-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  alt={"Casual Wear"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif">
                    {"Casual Wear"}
                  </h3>
                </div>
              </div>
            </Link>
            <Link to={`/category/Accessories`}>
              <div className="group relative h-96 overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  alt={"Accessories"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif">
                    {"Accessories"}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featureProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="group"
              >
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={item.image.primary}
                    alt={item.image.primary}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.price}</p>
                    <button className="btn btn-primary w-full">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
