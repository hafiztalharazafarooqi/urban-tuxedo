import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
  const [isNoVariantProduct, setIsNoVariantProduct] = useState(false);
  const [allColors, setAllColors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);

  const handleAddToCart = () => {
    // Get the current cart from localStorage (or use an empty array)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if the product is already in the cart
    const existingIndex = cart.findIndex(
      (item) => item._id === selectedProduct._id
    );
    if (
      existingIndex >= 0 &&
      cart[existingIndex]?.selectedSize === selectedSize
    ) {
      // Update the quantity if product exists
      cart[existingIndex].quantity += quantity;
    } else {
      // Add product with the current quantity
      cart.push({ ...selectedProduct, quantity, selectedSize });
    }
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Product added to cart!");
toast.success("Product added to cart!")
};

const handleBuyNow = () => {
  setTimeout(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...selectedProduct, quantity, selectedSize }])
    );
    toast.success("Product added to cart!")
    navigate("/cart");
  }, 1000);
  };

  useEffect(() => {
    // Find the product with the matching id
    getSelectedProducts();
  }, [id]);

  useEffect(() => {
    if (selectedProduct?.images?.primary) {
      setSelectedImage(selectedProduct.images.primary);
    }
  }, [selectedProduct]);

  const getSelectedProducts = async () => {
    try {
      const BACKEND_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${BACKEND_URL}/products/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // data.product.availableSizes[0].quantity = 0;
      setSelectedProduct(data.product);
      setLoading(false);
    } catch (error) {
      console.warn(`Login failed: ${error.message}`);
      setError("Failed to load product. Please try again later.");
    }
  };

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  // const onSizeSelect = (size) => {
  //   setSelectedSizeQuantity(size.quantity);
  //   setSelectedSize(size);
  // };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedSizeQuantity(null);
  };

  const handleSizeSelect = (sizeValue) => {
    const matchingVariants = selectedProduct.availableSizes.filter(
      (item) => item.size === sizeValue
    );

    let selectedVariant;

    if (selectedColor) {
      selectedVariant = matchingVariants.find(
        (item) => item.color === selectedColor
      );
    } else {
      selectedVariant = matchingVariants.find((item) => item.quantity > 0);
      if (selectedVariant?.color) setSelectedColor(selectedVariant.color);
    }

    setSelectedSize(selectedVariant);
    setSelectedSizeQuantity(selectedVariant?.quantity || 0);
  };

  useEffect(() => {
    const sizes = selectedProduct?.availableSizes || [];

    // 1. Check for no variant condition (only FREESIZE + NOCOLOR)
    const noVariant =
      sizes.length === 1 &&
      sizes[0].color === "NOCOLOR" &&
      sizes[0].size === "FREESIZE";

    if (noVariant) {
      setSelectedSizeQuantity(sizes[0].quantity);
      setSelectedSize(sizes[0]);
    }
    setIsNoVariantProduct(noVariant);

    // 2. Extract unique colors (excluding "NOCOLOR")
    const uniqueColors = [
      ...new Set(
        sizes.map((item) => item.color).filter((c) => c !== "NOCOLOR")
      ),
    ];
    console.log(uniqueColors);
    
    setAllColors(uniqueColors);

    // 3. Extract unique sizes (excluding "FREESIZE")
    const uniqueSizes = [
      ...new Set(
        sizes.map((item) => item.size).filter((s) => s !== "FREESIZE")
      ),
    ];
    setAllSizes(uniqueSizes);
  }, [selectedProduct]);

  return (
    <div>
      {loading ? (
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="space-y-4">
              <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-200 h-20 rounded-lg mb-4"
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className="bg-gray-200 h-20 rounded-lg mb-4"></h1>
              <p className="bg-gray-200 h-20 rounded-lg mb-4"></p>

              <div className="space-y-6">
                <div></div>

                <div>
                  <div className="bg-gray-200 h-20 rounded-lg mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !selectedProduct ? (
        <p className="text-red-500 text-center w-full">{error}</p>
      ) : (
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div
                className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-lg cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                <img
                  src={selectedImage || selectedProduct?.images?.primary}
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-200"
                />
                {isZooming && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={selectedImage || selectedProduct?.images?.primary}
                      alt="Product zoom"
                      className="absolute w-full h-full object-cover scale-150 transition-transform duration-200"
                      style={{
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {selectedProduct?.images?.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product view ${index}`}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-all duration-200 ${
                      selectedImage === img ? "ring-2 ring-red-600" : ""
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif mb-4">
                {selectedProduct?.title}
              </h1>
              {selectedProduct?.discountedPrice ? (
                <p className="text-lg text-gray-500 line-through mb-2">
                  £{selectedProduct?.price}
                </p>
              ) : (
                <p className="text-2xl text-red-600 mb-6">
                  £{selectedProduct?.price}
                </p>
              )}
              {selectedProduct?.discountedPrice ? (
                <p className="text-2xl text-red-600 mb-6">
                  £{selectedProduct?.discountedPrice}
                </p>
              ) : (
                ""
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg mb-2">Description</h3>
                  <p className="text-gray-600">
                    {selectedProduct?.description}
                  </p>
                </div>

                <div className="mt-6">
                  {isNoVariantProduct ? (
                    <div>
                      {/* <p className="text-sm text-gray-700 mb-2">
                        This product has no size or color selection.
                      </p> */}
                      {selectedProduct.availableSizes[0].quantity < 20 ? (
                        <p className="text-sm text-gray-600">
                          Only {selectedProduct.availableSizes[0].quantity} left
                          in stock
                        </p>
                      ) : (
                        ""
                      )}
                      {/* Quantity selector or Add to Cart button goes here */}
                    </div>
                  ) : (
                    <>
                      {/* COLOR SELECTION */}
                      {allColors.length > 0 && (
                        <div className="mb-4">
                          <h3 className="font-serif text-lg mb-2">
                            Select Color
                          </h3>
                          <div className="flex gap-4 flex-wrap">
                            {allColors.map((color) => {
                              const isDisabled =
                                selectedSize &&
                                !selectedProduct.availableSizes.find(
                                  (item) =>
                                    item.size === selectedSize.size &&
                                    item.color === color
                                );

                              return (
                                <button
                                  key={color}
                                  disabled={isDisabled}
                                  className={`px-4 py-2 border rounded-md transition-all duration-150 ${
                                    isDisabled
                                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                      : selectedColor === color
                                      ? "border-red-600 bg-red-600 text-white"
                                      : "border-gray-300 hover:border-red-600"
                                  }`}
                                  onClick={() => handleColorSelect(color)}
                                >
                                  {color}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SIZE SELECTION */}
                      {allSizes.length > 0 && (
                        <div className="mb-4">
                          <h3 className="font-serif text-lg mb-2">
                            Select Size
                          </h3>
                          <div className="flex gap-4 flex-wrap">
                            {allSizes.map((sizeValue) => {
                              const matchingVariants =
                                selectedProduct.availableSizes.filter(
                                  (item) => item.size === sizeValue
                                );

                              const isDisabled =
                                selectedColor &&
                                !matchingVariants.find(
                                  (item) =>
                                    item.color === selectedColor &&
                                    item.quantity > 0
                                );

                              const hasStock = matchingVariants.some(
                                (item) => item.quantity > 0
                              );
                              const fullyDisabled = !hasStock || isDisabled;

                              return (
                                <button
                                  key={sizeValue}
                                  disabled={fullyDisabled}
                                  className={`px-4 py-2 border rounded-md transition-all duration-150 ${
                                    fullyDisabled
                                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                      : selectedSize?.size === sizeValue
                                      ? "border-red-600 bg-red-600 text-white"
                                      : "border-gray-300 hover:border-red-600"
                                  }`}
                                  onClick={() => handleSizeSelect(sizeValue)}
                                >
                                  {sizeValue}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Quantity Display */}
                      {selectedSizeQuantity > 0 && (
                        <span className="text-sm text-gray-600 mt-1 block">
                          Only {selectedSizeQuantity} left in stock
                        </span>
                      )}
                    </>
                  )}
                </div>

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
                      onClick={() => {
                        if (quantity < selectedSizeQuantity) {
                          setQuantity(quantity + 1);
                        }
                      }}
                      disabled={quantity >= selectedSizeQuantity}
                      // onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="space-y-4">
                  <button
                    className="w-full py-3 px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={handleAddToCart}
                      

                  >
                    Add to Cart
                  </button>
                  <ToastContainer />
                  <button
                    className="btn btn-primary w-full py-3 rounded-full transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={handleBuyNow}
                  >
                    Buy Now
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

export default ProductDetail;
