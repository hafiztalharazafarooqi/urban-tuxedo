import { useState } from 'react';
import { FiUser, FiPackage, FiHeart, FiSettings } from 'react-icons/fi';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <nav className="space-y-2">
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                activeTab === 'profile' ? 'bg-gold text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser />
              Profile
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                activeTab === 'orders' ? 'bg-gold text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              <FiPackage />
              Orders
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                activeTab === 'wishlist' ? 'bg-gold text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('wishlist')}
            >
              <FiHeart />
              Wishlist
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                activeTab === 'settings' ? 'bg-gold text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <FiSettings />
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-4">Personal Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-4 py-2 border rounded-md"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-4 py-2 border rounded-md"
                      defaultValue="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full px-4 py-2 border rounded-md"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 w-full px-4 py-2 border rounded-md"
                      defaultValue="+1 234 567 8900"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-gold">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-serif mb-4">Order History</h2>
              <div className="space-y-4">
                {[1, 2].map((order) => (
                  <div key={order} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium">Order #{order}23456</p>
                        <p className="text-sm text-gray-600">Placed on March 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Delivered
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <img
                        src={`https://source.unsplash.com/random/100x100/?tuxedo&sig=${order}`}
                        alt="Product"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">Classic Black Tuxedo</p>
                        <p className="text-sm text-gray-600">Size: 42R</p>
                        <p className="text-gold">$599.99</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;