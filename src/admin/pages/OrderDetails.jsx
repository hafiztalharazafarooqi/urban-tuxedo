import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate an API fetch for a specific order
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        // Dummy API response with detailed order information
        const data = {
          id: orderId || "2024001",
          customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567"
          },
          date: new Date(),
          total: 599.99,
          status: "Processing",
          shippingAddress: {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States"
          },
          items: [
            {
              id: "PROD001",
              name: "Wireless Headphones",
              price: 299.99,
              quantity: 1,
              image: "/api/placeholder/80/80",
              subtotal: 299.99
            },
            {
              id: "PROD002",
              name: "Smart Watch",
              price: 249.99,
              quantity: 1,
              image: "/api/placeholder/80/80",
              subtotal: 249.99
            },
            {
              id: "PROD003",
              name: "USB-C Cable",
              price: 24.99,
              quantity: 2,
              image: "/api/placeholder/80/80",
              subtotal: 49.98
            }
          ],
          subtotal: 549.99,
          shipping: 10.00,
          tax: 40.00,
        };

        // Simulate a delay
        setTimeout(() => {
          setOrder(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  // Function to get appropriate status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin/orders" className="text-blue-600 hover:text-blue-900 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-serif">Order Details</h1>
        </div>
        
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span>{error}</span>
        </div>
      )}

      {/* Order Details */}
      {!loading && !error && order && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary and Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-medium">Order #{order.id}</h2>
                  <p className="text-gray-500 mt-1">
                    Placed on {format(order.date, "MMMM dd, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md" src={item.image} alt={item.name} />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-gray-500 text-sm">SKU: {item.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                          £{item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                          £{item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info, Shipping, Payment Details */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Customer Information</h3>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div>{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{order.customer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>{order.customer.phone}</div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
              <address className="not-italic">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                {order.shippingAddress.country}
              </address>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>£{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>£{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax</span>
                  <span>£{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>£{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;