import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, CreditCard, Truck, ChevronRight, Check, X } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "cod",
  });

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const shippingCost = 15.0;

  // Popup state
  const [orderId, setOrderId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate subtotal
    const total = storedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      },
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      totalAmount: subtotal + shippingCost,
    };

    console.log("Order Placed:", orderData);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a random order ID (for demo purposes)
      const generatedOrderId = Math.floor(Math.random() * 1000000);
      setOrderId(generatedOrderId);
      setShowPopup(true);
      setIsLoading(false);
    }, 1000);

    // Here you would send `orderData` to your backend via an API request
  };

  const handleClosePopup = () => {
    localStorage.removeItem("cart");
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Checkout Header */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center">Secure Checkout</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-3">
            Complete your order to experience our premium fashion collection
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Section */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-100 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-red-500" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-500">${(subtotal + shippingCost).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Checkout Steps */}
                <div className="flex border-b border-gray-100">
                  <div className="flex-1 py-4 px-6 bg-red-500 text-white font-medium">
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-white text-red-500 flex items-center justify-center mr-2 text-xs font-bold">1</span>
                      Contact & Shipping
                    </div>
                  </div>
                  <div className="flex-1 py-4 px-6 bg-gray-100 text-gray-500 font-medium">
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2 text-xs font-bold">2</span>
                      Payment & Review
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Contact Information */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <label className="block p-4 border border-gray-200 rounded-lg cursor-pointer transition hover:border-red-500 hover:shadow-md">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleChange}
                            className="h-5 w-5 text-red-500 mr-3"
                          />
                          <div className="flex items-center justify-between flex-1">
                            <div className="flex items-center">
                              <Truck className="h-5 w-5 text-gray-500 mr-3" />
                              <div>
                                <p className="font-medium">Cash on Delivery</p>
                                <p className="text-sm text-gray-500">Pay when your order arrives</p>
                              </div>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Recommended</span>
                          </div>
                        </div>
                      </label>

                      <label className="block p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed opacity-60">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            disabled
                            className="h-5 w-5 text-red-500 mr-3"
                          />
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-gray-500">Coming soon</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">Additional Notes (Optional)</h2>
                    <textarea
                      name="notes"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="Special instructions for delivery or any other information"
                    ></textarea>
                  </div>

                  {/* Benefits Section */}
                  <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Truck className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-sm">Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Check className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-sm">100% secure checkout</span>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-sm">30-day hassle-free returns</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow-sm hover:shadow-md transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex justify-center items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        Complete Purchase
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleClosePopup}
          ></div>
          <div className="bg-white rounded-xl shadow-2xl z-10 max-w-md mx-auto overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 right-4">
                <button onClick={handleClosePopup} className="text-gray-400 hover:text-gray-600 transition">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="bg-red-500 p-6 text-white text-center">
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                <p className="mt-2">Thank you for your purchase</p>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 mb-1">Order Reference</p>
                  <p className="text-lg font-mono font-bold"># {orderId}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>. We&apos;ll notify you when your order ships.
                </p>
                
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleClosePopup}
                    className="w-full py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow-sm"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/account/orders')}
                    className="w-full py-3 bg-transparent border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                  >
                    View Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;