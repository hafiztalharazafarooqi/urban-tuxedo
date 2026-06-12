import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";

function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  };

  useEffect(() => {
    loadCart();

    // Listen to custom updates within the app
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);

    // Set up a quick polling interval for absolute safety
    const interval = setInterval(loadCart, 1500);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
      clearInterval(interval);
    };
  }, []);

  const handleRemove = (id, sizeVal, colorVal) => {
    const updated = cartItems.filter(
      (item) => !(item._id === id && item.selectedSize?.size === sizeVal && item.selectedSize?.color === colorVal)
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.discountRate > 0
        ? item.discountedPrice * item.quantity
        : item.price * item.quantity),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiShoppingBag className="text-primary" size={18} />
            <h3 className="font-serif text-lg tracking-wide text-primary">Your Cart</h3>
            <span className="bg-accent/20 text-accent font-medium text-xs px-2 py-0.5 font-sans">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <FiShoppingBag className="text-gray-300" size={24} />
              </div>
              <h4 className="font-serif text-base text-primary mb-2">Cart is empty</h4>
              <p className="text-gray-400 text-xs max-w-xs mx-auto mb-6">
                Add premium formal wear to your shopping cart to begin your style journey.
              </p>
              <button
                onClick={onClose}
                className="btn btn-secondary text-xs tracking-widest px-6 py-3"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const hasDiscount = item.discountRate > 0;
              const unitPrice = hasDiscount ? item.discountedPrice : item.price;
              
              return (
                <div key={`${item._id}-${idx}`} className="flex gap-4 pb-4 border-b border-gray-100 group">
                  <div className="w-16 h-20 bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                    <img
                      src={item.images?.primary}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-serif text-sm text-primary line-clamp-1 hover:text-accent transition-colors">
                          <Link to={`/product/${item._id}`} onClick={onClose}>
                            {item.title}
                          </Link>
                        </h5>
                        <button
                          onClick={() => handleRemove(item._id, item.selectedSize?.size, item.selectedSize?.color)}
                          className="text-gray-300 hover:text-accent transition-colors"
                          title="Remove item"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium mt-1">
                        {item.selectedSize && item.selectedSize.size !== "FREESIZE" && (
                          <span className="mr-3">SIZE: {item.selectedSize.size}</span>
                        )}
                        {item.selectedSize && item.selectedSize.color !== "NOCOLOR" && (
                          <span>COLOR: {item.selectedSize.color}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 font-light">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-xs font-semibold text-primary">
                        £{(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Subtotal
              </span>
              <span className="text-lg font-serif font-bold text-primary">
                £{subtotal.toFixed(2)}
              </span>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center font-light">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="grid grid-cols-1 gap-2 pt-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full text-center bg-transparent border border-primary hover:bg-primary hover:text-white text-xs tracking-widest uppercase py-3.5 transition-all duration-300 font-semibold"
              >
                View Bag
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full text-center bg-primary text-white hover:bg-accent hover:text-primary hover:border-accent text-xs tracking-widest uppercase py-3.5 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <span>Checkout Now</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
