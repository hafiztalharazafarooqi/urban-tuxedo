import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Checkout() {
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
  const [loader, setLoader] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 0;

  // Popup state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate subtotal
    // const total = storedCart.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );
    const total = storedCart.reduce(
      (acc, item) =>
        acc +
        (item.discountRate > 0
          ? item.discountedPrice * item.quantity
          : item.price * item.quantity),
      0
    );
    setSubtotal(total);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function cartItemsForCheckout() {
    return cartItems.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.discountRate > 0 ? item.discountedPrice : item.price,
      images: item.images,
      selectedSize: item.selectedSize?.size || null, // Extract only the size
      quantity: item.selectedSize?.quantity || 1, // Ensure quantity is included
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
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
      status: "processing",
      items: cartItemsForCheckout(),
      totalAmount: subtotal + shippingCost,
    };
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    console.log({ orderData });
    try {
      const response = await fetch(`${BACKEND_URL}/products/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();

      window.location.href = data.url;
      setLoader(false);
      // setOrderId(data.orderId);
      // setShowPopup(true);
    } catch (error) {
      console.error("Error placing order:", error);
      setLoader(false);
      // You might want to show an error message to the user here
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <div className="flex justify-between">
                <h2 className="font-serif text-xl mb-4">Contact Information</h2>
                <Link
                  to={"/login"}
                  className="font-serif text-xl mb-4 hover:text-red-600 hover:font-bold hover:text-ellipsis"
                >
                  Login
                </Link>
              </div>
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

            <button
              type="submit"
              className="w-full px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {loader ? "Placing Order" : "Place Order"}
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
            {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div> */}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>£{(subtotal + shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
