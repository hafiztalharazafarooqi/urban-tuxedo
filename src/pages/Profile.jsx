import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut, ChevronRight, Edit, ShoppingBag, Star, CreditCard, MapPin } from "lucide-react";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem("isLogin");
      window.dispatchEvent(new Event("storage")); // Notify other components
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  // Mock order data
  const orders = [
    {
      id: "ORD123456",
      date: "February 25, 2025",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
      items: [
        {
          id: 1,
          name: "Classic Black Tuxedo",
          size: "42R",
          price: 599.99,
          image: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: "ORD123455",
      date: "February 10, 2025",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800",
      items: [
        {
          id: 2,
          name: "Navy Blue Suit",
          size: "40R",
          price: 499.99,
          image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=100&h=100&fit=crop"
        },
        {
          id: 3,
          name: "White Dress Shirt",
          size: "M",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=100&h=100&fit=crop"
        }
      ]
    }
  ];

  // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Premium Velvet Tuxedo",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1592878849122-facb97756fa3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Italian Silk Tie",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1598532213005-771da5387105?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Leather Oxford Shoes",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1614253429340-9caebb3f6075?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with User Banner */}
      <section className="relative h-64 flex items-center justify-center text-center bg-cover bg-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1487222477894-8943e31ef7b2')",
            backgroundBlendMode: "overlay",
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2 text-white leading-tight">
            Your <span className="text-red-400">Personal</span> Account
          </h1>
          <p className="text-xl text-gray-200 max-w-xl mx-auto">
            Manage your profile, track orders, and discover your next style upgrade
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-16">
        {/* User Card - Positioned over the hero image */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 hover:shadow-md transform hover:-translate-y-1">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                <span className="text-3xl font-bold text-red-500">JD</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="px-6 py-3 flex items-center gap-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition shadow-sm hover:shadow-md transform hover:-translate-y-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Navigation Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <nav className="space-y-2">
                <button
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition transform ${
                    activeTab === 'profile' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:-translate-y-1'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </div>
                  {activeTab === 'profile' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition transform ${
                    activeTab === 'orders' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:-translate-y-1'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Orders</span>
                  </div>
                  {activeTab === 'orders' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition transform ${
                    activeTab === 'wishlist' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:-translate-y-1'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                  {activeTab === 'wishlist' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition transform ${
                    activeTab === 'settings' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:-translate-y-1'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </div>
                  {activeTab === 'settings' && <ChevronRight className="h-5 w-5" />}
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1 transform hover:-translate-y-1 transition">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-8">
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="John"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="+1 234 567 8900"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-8">
                      <button type="submit" className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="px-8 py-6 border-t border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1 transform hover:-translate-y-1 transition">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Home Address</h3>
                      <p className="text-gray-600 mt-2 text-lg">
                        123 Fashion Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-6 border-t border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Payment Methods</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1 transform hover:-translate-y-1 transition">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Visa ending in 4242</h3>
                      <p className="text-gray-600 mt-2 text-lg">Expires 12/2026</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b bg-gray-50">
                  <h2 className="text-2xl font-bold">Order History</h2>
                </div>
                
                <div className="p-8 space-y-8">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                      <div className="bg-gray-50 px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-lg">Order {order.id}</p>
                            <span className={`px-3 py-1 ${order.statusColor} rounded-full text-xs font-medium`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">Placed on {order.date}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 self-start md:self-center">
                          View Order Details
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="p-8 border-t border-gray-200">
                        <div className="space-y-6">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-6">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                              />
                              <div className="flex-1">
                                <h3 className="text-xl font-medium">{item.name}</h3>
                                <p className="text-gray-600 mt-1">Size: {item.size}</p>
                                <p className="text-red-500 font-medium mt-2 text-lg">£{item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex flex-col gap-3">
                                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition">
                                  Buy Again
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-red-500 hover:text-red-500 transition flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  Review
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {orders.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">No orders yet</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">You haven&apos;t placed any orders yet. Start exploring our collections to find your perfect style.</p>
                      <Link to="/category" className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b bg-gray-50">
                  <h2 className="text-2xl font-bold">My Wishlist</h2>
                </div>
                
                <div className="p-8">
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition">
                              <Heart className="h-5 w-5" />
                            </button>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-medium text-lg text-gray-800 group-hover:text-red-500 transition">
                              {item.name}
                            </h3>
                            <p className="text-red-500 font-bold mt-2 text-lg">£{item.price.toFixed(2)}</p>
                            <button className="w-full mt-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-red-500 transition">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">Save items you love for later and never miss out on your favorite pieces.</p>
                      <Link to="/category" className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Explore Collections
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b bg-gray-50">
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="border-b pb-8">
                    <h3 className="text-xl font-medium mb-6">Change Password</h3>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <button className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className="border-b pb-8">
                    <h3 className="text-xl font-medium mb-6">Notification Preferences</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">Order Updates</p>
                          <p className="text-gray-600 mt-1">Receive updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">Promotions & Offers</p>
                          <p className="text-gray-600 mt-1">Receive special offers and promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">New Collection Alerts</p>
                          <p className="text-gray-600 mt-1">Be notified about new product launches</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-6 text-red-500">Danger Zone</h3>
                    <p className="text-gray-600 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-8 py-3 bg-white border-2 border-red-500 text-red-500 font-medium rounded-full hover:bg-red-50 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-red-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Style Community</h2>
            <p className="mb-8">Subscribe to receive exclusive offers, early access to new collections, and style inspiration.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;