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
            <Link to="/categories" className="btn btn-gold">
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
            <div className="group relative h-96 overflow-hidden">
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSURH8TQ-4Yotc_TA7kUaaIGotAtEf54euuJsjyJ_8QNdIXiBFX__XBdOfk550dooUuQNA&usqp=CAU`}
                alt={"Formal Wear"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif">
                  {"Formal Wear"}
                </h3>
              </div>
            </div>
            <div className="group relative h-96 overflow-hidden">
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_BsdtqdfeZo_GxUEAKnNppLLQaAQ3TW3Zw&s`}
                alt={"Casual Wear"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif">
                  {"Casual Wear"}
                </h3>
              </div>
            </div>
            <div className="group relative h-96 overflow-hidden">
              <img
                src={`data:image/jpeg;base64,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`}
                alt={"Accessories"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif">
                  {"Accessories"}
                </h3>
              </div>
            </div>
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
                    src={item.images.primary}
                    alt={item.images.primary}
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
