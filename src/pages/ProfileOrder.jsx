import {
    ChevronRight,
    ShoppingBag,
    Star
} from "lucide-react";
import { Link } from "react-router-dom";

function ProfileOrder() {


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
          image:
            "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=100&h=100&fit=crop",
        },
      ],
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
          image:
            "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=100&h=100&fit=crop",
        },
        {
          id: 3,
          name: "White Dress Shirt",
          size: "M",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=100&h=100&fit=crop",
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 border-b bg-gray-50">
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      <div className="p-8 space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="bg-gray-50 px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-lg">Order {order.id}</p>
                  <span
                    className={`px-3 py-1 ${order.statusColor} rounded-full text-xs font-medium`}
                  >
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
                      <p className="text-red-500 font-medium mt-2 text-lg">
                        £{item.price.toFixed(2)}
                      </p>
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
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t placed any orders yet. Start exploring our
              collections to find your perfect style.
            </p>
            <Link
              to="/category"
              className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileOrder;
