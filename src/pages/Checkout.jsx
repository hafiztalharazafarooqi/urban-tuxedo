import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    // Generate a random order ID (for demo purposes)
    const generatedOrderId = Math.floor(Math.random() * 1000000);
    setOrderId(generatedOrderId);
    setShowPopup(true);

    // Here you can send `orderData` to your backend via an API request
  };

  const handleClosePopup = () => {
    localStorage.removeItem('cart');
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-xl mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-serif text-xl mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-serif text-xl mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-gold w-full py-3">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="font-serif text-xl mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>£{(subtotal + shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleClosePopup}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
            <p className="mb-6">Your order ID is {orderId}</p>
            <button
              onClick={handleClosePopup}
              className="btn btn-gold px-6 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
