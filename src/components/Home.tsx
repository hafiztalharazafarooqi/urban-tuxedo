import { useState } from "react";
import { Menu, ShoppingBag, User, ChevronDown } from "lucide-react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BrandName</h1>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black flex items-center">Shop <ChevronDown className="ml-1" size={16} /></a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <ShoppingBag className="cursor-pointer" />
          <User className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
          <Menu className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {/* Profile Menu */}
      {profileOpen && (
        <div className="absolute right-6 mt-2 bg-white shadow-lg p-4 rounded-lg">
          <p className="text-gray-800">Welcome, User</p>
          <a href="#" className="block mt-2 text-gray-600 hover:text-black">Profile</a>
          <a href="#" className="block mt-2 text-gray-600 hover:text-black">Orders</a>
          <a href="#" className="block mt-2 text-gray-600 hover:text-black">Logout</a>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg')" }}>
        <div className="bg-black bg-opacity-50 p-10 rounded-lg">
          <h2 className="text-5xl font-bold mb-4">Discover the Latest Trends</h2>
          <button className="bg-white text-black px-8 py-3 rounded-md text-lg font-semibold">Shop Now</button>
        </div>
      </section>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-64 bg-white shadow-lg p-6 hidden md:block">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul className="space-y-3">
            {['Men', 'Women', 'Accessories', 'Shoes', 'New Arrivals', 'Sale'].map((category) => (
              <li key={category} className="text-gray-700 hover:text-black cursor-pointer">
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 px-6 py-10">
          {/* Product Grid */}
          <h3 className="text-3xl font-bold text-center mb-8">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
              "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
              "https://images.pexels.com/photos/8386642/pexels-photo-8386642.jpeg",
              "https://images.pexels.com/photos/2849820/pexels-photo-2849820.jpeg",
              "https://images.pexels.com/photos/4663965/pexels-photo-4663965.jpeg",
              "https://images.pexels.com/photos/974316/pexels-photo-974316.jpeg"
            ].map((img, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center">
                <img src={img} alt={`Product ${index + 1}`} className="h-48 w-full object-cover rounded-md" />
                <h4 className="text-lg font-semibold mt-4">Product {index + 1}</h4>
                <p className="text-gray-600 text-lg">$99.99</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-md text-lg font-semibold">Buy Now</button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p>&copy; 2025 BrandName. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
