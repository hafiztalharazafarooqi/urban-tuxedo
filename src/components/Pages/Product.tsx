
const Product = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-64 bg-white shadow-lg p-6 hidden md:block">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul className="space-y-3">
            {[
              "Men",
              "Women",
              "Accessories",
              "Shoes",
              "New Arrivals",
              "Sale",
            ].map((category) => (
              <li
                key={category}
                className="text-gray-700 hover:text-black cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 px-6 py-10">
          {/* Product Grid */}
          <h3 className="text-3xl font-bold text-center mb-8">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
              "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
              "https://images.pexels.com/photos/8386642/pexels-photo-8386642.jpeg",
              "https://images.pexels.com/photos/2849820/pexels-photo-2849820.jpeg",
              "https://images.pexels.com/photos/4663965/pexels-photo-4663965.jpeg",
              "https://images.pexels.com/photos/974316/pexels-photo-974316.jpeg",
            ].map((img, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-md rounded-lg text-center"
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="h-48 w-full object-cover rounded-md"
                />
                <h4 className="text-lg font-semibold mt-4">
                  Product {index + 1}
                </h4>
                <p className="text-gray-600 text-lg">$99.99</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-md text-lg font-semibold">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Product;
