import { ArrowRight, ChevronLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Dispatch cart-updated event to update the Navbar/CartDrawer counts
    window.dispatchEvent(new Event("cart-updated"));
  }, [cartItems]);

  const handleRemove = (id, sizeVal, colorVal) => {
    const updatedCart = cartItems.filter(
      (item) => !(item._id === id && item.selectedSize?.size === sizeVal && item.selectedSize?.color === colorVal)
    );
    setCartItems(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.discountRate > 0
        ? item.discountedPrice * item.quantity
        : item.price * item.quantity),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-32 text-center bg-brandBg min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="h-10 w-10 text-gray-300" />
          </div>
          <h1 className="font-serif text-2xl text-primary font-light">Your Shopping Bag is Empty</h1>
          <p className="text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">
            Discover our luxury formal wear, blazers, and wedding edits to add timeless elegance to your wardrobe.
          </p>
          <div className="pt-4">
            <Link
              to="/category"
              className="btn btn-primary text-xs tracking-widest px-8"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brandBg min-h-screen pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-6 gap-4 text-center">
          <Link
            to="/category"
            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary flex items-center gap-1.5 transition-colors duration-300"
          >
            <ChevronLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="font-serif text-3xl font-light text-primary flex-1 md:text-right">
            Your Shopping Bag
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List (Columns 8) */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item, index) => {
              const hasDiscount = item.discountRate > 0;
              const unitPrice = hasDiscount ? item.discountedPrice : item.price;
              
              return (
                <div
                  key={`${item._id}-${index}`}
                  className="bg-white border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 shadow-xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-32 overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100/50">
                    <img
                      src={item.images?.primary}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] tracking-widest text-accent uppercase font-bold block mb-1">
                            Urban Tuxedo
                          </span>
                          <h3 className="font-serif text-base text-primary hover:text-accent transition-colors">
                            <Link to={`/product/${item._id}`}>{item.title}</Link>
                          </h3>
                        </div>
                        <button
                          className="text-gray-300 hover:text-accent transition-colors p-1"
                          onClick={() => handleRemove(item._id, item.selectedSize?.size, item.selectedSize?.color)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <div className="text-[11px] text-gray-400 font-semibold tracking-wider mt-3 flex flex-wrap gap-4 uppercase">
                        {item.selectedSize && item.selectedSize.size !== "FREESIZE" && (
                          <span>SIZE: {item.selectedSize.size}</span>
                        )}
                        {item.selectedSize && item.selectedSize.color !== "NOCOLOR" && (
                          <span>COLOR: {item.selectedSize.color}</span>
                        )}
                        <span>QTY: {item.quantity}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex justify-between items-end border-t border-gray-50 pt-4 mt-4 text-xs">
                      <div className="space-y-0.5 text-gray-400 font-light">
                        <span>Unit Price: </span>
                        {hasDiscount ? (
                          <>
                            <span className="line-through mr-1.5">£{item.price.toFixed(2)}</span>
                            <span className="text-accent font-semibold">£{item.discountedPrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-primary font-medium">£{item.price.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="font-serif text-sm font-bold text-primary">
                        Total: £{(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Order Summary Sidebar (Columns 4) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-8 space-y-6 shadow-sm sticky top-28">
              <h2 className="font-serif text-lg text-primary tracking-wide border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                  <span>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    Items)
                  </span>
                  <span className="font-semibold text-primary">£{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                  <span>Shipping</span>
                  <span className="text-accent font-semibold uppercase tracking-widest text-[10px]">
                    Complimentary
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-5">
                  <div className="flex justify-between items-center text-primary">
                    <span className="text-xs uppercase tracking-widest font-bold">Total (VAT Inc.)</span>
                    <span className="font-serif text-xl font-bold">£{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full mt-6 bg-primary text-white hover:bg-accent hover:text-primary hover:border-accent text-xs font-semibold tracking-widest uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2 border border-primary"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;
