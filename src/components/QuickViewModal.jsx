import { useState, useEffect } from "react";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

function QuickViewModal({ product, onClose, onCartUpdated }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
  const [isNoVariantProduct, setIsNoVariantProduct] = useState(false);
  const [allColors, setAllColors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    if (product?.images?.primary) {
      setSelectedImage(product.images.primary);
    }
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const sizes = product.availableSizes || [];

    const noVariant =
      sizes.length === 1 &&
      sizes[0].color === "NOCOLOR" &&
      sizes[0].size === "FREESIZE";

    if (noVariant) {
      setSelectedSizeQuantity(sizes[0].quantity);
      setSelectedSize(sizes[0]);
    }
    setIsNoVariantProduct(noVariant);

    const uniqueColors = [
      ...new Set(sizes.map((item) => item.color).filter((c) => c !== "NOCOLOR")),
    ];
    setAllColors(uniqueColors);

    const uniqueSizes = [
      ...new Set(sizes.map((item) => item.size).filter((s) => s !== "FREESIZE")),
    ];
    setAllSizes(uniqueSizes);
  }, [product]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedSizeQuantity(null);
  };

  const handleSizeSelect = (sizeValue) => {
    const matchingVariants = product.availableSizes.filter(
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

  const handleAddToCart = () => {
    if (!isNoVariantProduct && allSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!isNoVariantProduct && allColors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) => item._id === product._id && item.selectedSize?.size === selectedSize?.size && item.selectedSize?.color === selectedSize?.color
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity, selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart!", { theme: "dark" });
    window.dispatchEvent(new Event("cart-updated"));
    if (onCartUpdated) onCartUpdated();
    onClose();
  };

  if (!product) return null;

  const hasDiscount = product.discountRate > 0;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm border border-gray-100"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        {/* Product Media (Left column) */}
        <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col justify-between overflow-y-auto">
          <div className="aspect-[3/4] w-full relative overflow-hidden bg-white">
            <img
              src={selectedImage || product.images.primary}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Gallery selector */}
          {product.images?.gallery && product.images.gallery.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.gallery.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 flex-shrink-0 bg-white border overflow-hidden ${
                    selectedImage === img ? "border-accent ring-1 ring-accent" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info (Right column) */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-semibold block mb-2">
              Urban Tuxedo
            </span>
            <h2 className="font-serif text-2xl text-primary tracking-wide mb-3">
              {product.title}
            </h2>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-6">
              {hasDiscount ? (
                <>
                  <span className="text-gray-400 line-through text-sm font-light">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="text-accent text-xl font-bold tracking-wide">
                    £{product.discountedPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-primary text-xl font-medium tracking-wide">
                  £{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selection */}
            {!isNoVariantProduct && allColors.length > 0 && (
              <div className="mb-5">
                <span className="text-[11px] tracking-widest font-semibold uppercase text-primary mb-2 block">
                  Color: {selectedColor || "Select Color"}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {allColors.map((color) => {
                    const isDisabled =
                      selectedSize &&
                      !product.availableSizes.find(
                        (item) => item.size === selectedSize.size && item.color === color
                      );

                    return (
                      <button
                        key={color}
                        disabled={isDisabled}
                        onClick={() => handleColorSelect(color)}
                        className={`px-4 py-2 text-xs border tracking-wider transition-all duration-300 ${
                          isDisabled
                            ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                            : selectedColor === color
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 hover:border-primary text-primary"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selection */}
            {!isNoVariantProduct && allSizes.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] tracking-widest font-semibold uppercase text-primary mb-2 block">
                  Size: {selectedSize?.size || "Select Size"}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {allSizes.map((sizeValue) => {
                    const matchingVariants = product.availableSizes.filter(
                      (item) => item.size === sizeValue
                    );

                    const isDisabled =
                      selectedColor &&
                      !matchingVariants.find(
                        (item) => item.color === selectedColor && item.quantity > 0
                      );

                    const hasStock = matchingVariants.some((item) => item.quantity > 0);
                    const fullyDisabled = !hasStock || isDisabled;

                    return (
                      <button
                        key={sizeValue}
                        disabled={fullyDisabled}
                        onClick={() => handleSizeSelect(sizeValue)}
                        className={`px-4 py-2 text-xs border tracking-wider transition-all duration-300 ${
                          fullyDisabled
                            ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                            : selectedSize?.size === sizeValue
                            ? "border-accent bg-accent text-primary font-medium"
                            : "border-gray-200 hover:border-primary text-primary"
                        }`}
                      >
                        {sizeValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock Count */}
            {selectedSizeQuantity > 0 && (
              <div className="text-[11px] text-accent font-medium uppercase tracking-wider mb-6">
                Only {selectedSizeQuantity} left in stock
              </div>
            )}
          </div>

          {/* Action Row */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                QTY:
              </span>
              <div className="flex items-center border border-gray-200 bg-white">
                <button
                  className="p-3 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>
                <span className="px-4 text-sm font-semibold w-10 text-center select-none">
                  {quantity}
                </span>
                <button
                  className="p-3 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => {
                    if (!selectedSizeQuantity || quantity < selectedSizeQuantity) {
                      setQuantity(quantity + 1);
                    } else {
                      toast.warning("Cannot exceed available stock");
                    }
                  }}
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white border border-primary hover:bg-accent hover:text-primary hover:border-accent font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
