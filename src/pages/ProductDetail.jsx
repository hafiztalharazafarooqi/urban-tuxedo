import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingBag, Heart, Truck, ArrowLeft, Plus, Minus, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const isUserLoggedIn = !!localStorage.getItem("isLogin");
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (isUserLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = cart.findIndex(
        (item) => item.id === selectedProduct._id
      );
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({ 
          ...selectedProduct, 
          quantity,
          selectedSize: selectedSize || null 
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Show toast notification instead of alert
      showNotification("Product added to your cart!");
    } else {
      localStorage.setItem("redirectAfterLogin", `/product/${id}`);
      navigate("/login");
    }
  };

  const showNotification = (message) => {
    const notification = document.getElementById("notification");
    if (notification) {
      notification.innerText = message;
      notification.classList.remove("opacity-0");
      notification.classList.add("opacity-100");
      
      setTimeout(() => {
        notification.classList.remove("opacity-100");
        notification.classList.add("opacity-0");
      }, 3000);
    }
  };

  useEffect(() => {
    getSelectedProduct();
  }, [id]);

  useEffect(() => {
    if (selectedProduct && selectedProduct.image) {
      setMainImage(selectedProduct.image.primary);
    }
  }, [selectedProduct]);

  const getSelectedProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://urban-tuxedo-backend.vercel.app/api/products/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setSelectedProduct(data.product);
    } catch (error) {
      console.warn(`Failed to fetch product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateMainImage = (image) => {
    setMainImage(image);
  };

  // Available sizes (this would typically come from your product data)
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification toast */}
      <div id="notification" className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50">
        Product added to your cart!
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/category" className="hover:text-red-500 transition">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Product Details</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-96 w-full rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 h-24 w-full rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ) : selectedProduct ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative group">
                <Link to="/category" className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={mainImage}
                    alt={selectedProduct?.title}
                    className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <img
                  src={selectedProduct?.image?.primary}
                  alt={`Primary view`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition ${
                    mainImage === selectedProduct?.image?.primary ? "ring-2 ring-red-500" : ""
                  }`}
                  onClick={() => updateMainImage(selectedProduct?.image?.primary)}
                />
                {selectedProduct?.image?.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition ${
                      mainImage === img ? "ring-2 ring-red-500" : ""
                    }`}
                    onClick={() => updateMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-3">{selectedProduct?.title}</h1>
                <p className="text-2xl text-red-500 font-bold">£{selectedProduct?.price}</p>
              </div>

              <div className="border-t border-b py-6">
                <h3 className="text-lg font-medium mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct?.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Select Size</h3>
                  <button className="text-sm text-red-500 hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] py-2 border rounded-md transition ${
                        selectedSize === size
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-300 hover:border-red-500"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-4 border rounded-md inline-flex">
                  <button
                    className="p-3 text-gray-600 hover:text-red-500 transition"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    className="p-3 text-gray-600 hover:text-red-500 transition"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-4">
                <button
                  className="w-full py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  className="w-full py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
                <button
                  className="w-full py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </button>
              </div>

              {/* Benefits Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 border-t">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="text-red-500 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-500">On orders over £75</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-red-500 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-gray-500">100% secure checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <p className="mt-4 text-gray-600">The product you&apos;re looking for might be unavailable.</p>
            <Link to="/category" className="mt-8 inline-block px-6 py-3 bg-red-500 text-white font-medium rounded-full">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      
      {/* Related Products Section */}
      {selectedProduct && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-151708968429${item}-c73779587ccf?w=500&h=600&fit=crop`}
                        alt="Related product"
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition duration-300">
                        <p className="text-white font-medium">View Details</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-red-500 transition">
                          Product {item}
                        </h3>
                        <p className="text-red-500 text-lg font-bold">
                          £{(50 + item * 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;