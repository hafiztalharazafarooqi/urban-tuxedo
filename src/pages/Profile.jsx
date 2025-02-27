import { useState } from "react";
import { User, Package, Heart, Settings, LogOut, ChevronRight, Edit, ShoppingBag, Star, CreditCard, MapPin } from "lucide-react";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem("isLogin");
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header with greeting and logout */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="text-gray-600 mt-1">Welcome back, John Doe</p>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 flex items-center gap-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-red-500">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === 'profile' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </div>
                  {activeTab === 'profile' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === 'orders' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    <span>Orders</span>
                  </div>
                  {activeTab === 'orders' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === 'wishlist' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </div>
                  {activeTab === 'wishlist' && <ChevronRight className="h-5 w-5" />}
                </button>
                
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
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
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="John"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                          defaultValue="+1 234 567 8900"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <button type="submit" className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow-sm hover:shadow-md">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="px-6 py-4 border-t border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Home Address</h3>
                      <p className="text-gray-600 mt-1">
                        123 Fashion Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Payment Methods</h2>
                  <button className="text-red-500 hover:text-red-600 flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <CreditCard className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visa ending in 4242</h3>
                      <p className="text-gray-600 mt-1">Expires 12/2026</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h2 className="text-xl font-bold">Order History</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Order {order.id}</p>
                            <span className={`px-3 py-1 ${order.statusColor} rounded-full text-xs font-medium`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Placed on {order.date}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 self-start md:self-center">
                          View Order Details
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="p-6 border-t border-gray-200">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">Size: {item.size}</p>
                                <p className="text-red-500 font-medium mt-1">£{item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <button className="text-sm text-gray-700 hover:text-red-500 transition">
                                  Buy Again
                                </button>
                                <button className="text-sm text-gray-700 hover:text-red-500 transition flex items-center gap-1">
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
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet.</p>
                      <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition">
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h2 className="text-xl font-bold">My Wishlist</h2>
                </div>
                
                <div className="p-6">
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group border border-gray-200 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                            />
                            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition">
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-800 group-hover:text-red-500 transition">
                              {item.name}
                            </h3>
                            <p className="text-red-500 font-medium mt-1">£{item.price.toFixed(2)}</p>
                            <button className="w-full mt-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-6">Save items you love for later.</p>
                      <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition">
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h2 className="text-xl font-bold">Account Settings</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition">
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-600">Receive updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions & Offers</p>
                          <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Collection Alerts</p>
                          <p className="text-sm text-gray-600">Be notified about new product launches</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-red-500">Danger Zone</h3>
                    <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-6 py-3 bg-white border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;