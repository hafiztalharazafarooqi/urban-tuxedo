import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart
      ? JSON.parse(storedCart)
      : []
  });

  // Update localStorage whenever the cartItems state changes.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Increment quantity for the given product id.
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Decrement quantity for the given product id (minimum 1).
  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // Remove an item from the cart.
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calculate subtotal, shipping, and total.
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 bg-white p-6 rounded-lg shadow-md">
              <img
                src={item.image.primary}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-serif text-lg">{item.title}</h3>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
                {/* <p className="text-gray-600 mb-2">Size: {item.size}</p> */}
                <p className="text-gold font-medium">£{item.price}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    className="p-1 hover:text-gold"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="p-1 hover:text-gold"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
              <span>£{ shipping.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout"  className="btn btn-gold w-full text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
