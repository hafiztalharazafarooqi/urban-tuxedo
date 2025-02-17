import { Link } from 'react-router-dom';

function Home() {
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
            <p className="text-xl mb-8">Discover our premium collection of handcrafted tuxedos and formal wear.</p>
            <Link to="/categories" className="btn btn-gold">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Formal Wear', 'Casual Wear', 'Accessories'].map((category) => (
              <div key={category} className="group relative h-96 overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/800x1200/?${category.toLowerCase()}`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/400x500/?tuxedo`}
                  alt="Product"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg mb-2">Classic Black Tuxedo</h3>
                  <p className="text-gray-600 mb-2">$599.99</p>
                  <button className="btn btn-primary w-full">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;