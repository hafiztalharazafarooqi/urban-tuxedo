import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const isUserLoggedIn = !!localStorage.getItem("isLogin"); // Example: Check if token exists
  const navigate = useNavigate();

  // const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selctedProduct, setSelctedProduct] = useState({});

  const handleAddToCart = () => {
    console.log(isUserLoggedIn)
    if (isUserLoggedIn) {
      // Get the current cart from localStorage (or use an empty array)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Check if the product is already in the cart
      const existingIndex = cart.findIndex(
        (item) => item.id === selctedProduct.id
      );
      if (existingIndex >= 0) {
        // Update the quantity if product exists
        cart[existingIndex].quantity += quantity;
      } else {
        // Add product with the current quantity
        cart.push({ ...selctedProduct, quantity });
      }
      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      // alert("Product added to cart!");
    } else {
      localStorage.setItem("redirectAfterLogin", `/product/${id}`);
      navigate("/login");
    }
  };

  useEffect(() => {
    // Find the product with the matching id
    getSelectedProducts();
  }, [id]);

  const getSelectedProducts = async () => {
    try {
      const response = await fetch(
        `https://urban-tuxedo-backend.vercel.app/api/products/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data.product);
      setSelctedProduct(data.product);
      console.log(response);
    } catch (error) {
      console.warn(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="container-custom py-12">
      {selctedProduct ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={selctedProduct?.image?.primary}
                alt="Product"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {selctedProduct?.image?.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product view ${index}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif mb-4">
              {selctedProduct?.title}
            </h1>
            <p className="text-2xl text-gold mb-6">{selctedProduct?.price}</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg mb-2">Description</h3>
                <p className="text-gray-600">{selctedProduct?.description}</p>
              </div>

              {/* Size Selection */}
              {/* <div>
              <h3 className="font-serif text-lg mb-2">Select Size</h3>
              <div className="flex gap-4">
                {["38R", "40R", "42R", "44R", "46R"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "border-gold bg-gold text-white"
                        : "border-gray-300 hover:border-gold"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

              {/* Quantity */}
              <div>
                <h3 className="font-serif text-lg mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="text-xl">{quantity}</span>
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <button
                  className="btn btn-gold w-full py-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                {/* <button
                className="btn btn-primary w-full py-3"
                onClick={handleBuyNow}
              >
                Buy Now
              </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductDetail;
