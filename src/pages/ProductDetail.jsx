import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FiMinus, FiPlus, FiChevronDown, FiChevronUp, FiInfo } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  
  // States
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
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
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Accordion state
  const [openSection, setOpenSection] = useState("details");

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const handleAddToCart = () => {
    if (!isNoVariantProduct && allSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", { theme: "dark" });
      return;
    }
    if (!isNoVariantProduct && allColors.length > 0 && !selectedColor) {
      toast.error("Please select a color", { theme: "dark" });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) => item._id === selectedProduct._id && item.selectedSize?.size === selectedSize?.size && item.selectedSize?.color === selectedSize?.color
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...selectedProduct, quantity, selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart!", { theme: "dark" });
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleBuyNow = () => {
    if (!isNoVariantProduct && allSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", { theme: "dark" });
      return;
    }
    
    setTimeout(() => {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...selectedProduct, quantity, selectedSize }])
      );
      toast.success("Product added to cart!", { theme: "dark" });
      window.dispatchEvent(new Event("cart-updated"));
      navigate("/cart");
    }, 800);
  };

  const getSelectedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/products/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setSelectedProduct(data.product);
      
      // Fetch related items
      try {
        const catName = data.product.category;
        const allRes = await fetch(`${BACKEND_URL}/products`);
        const allData = await allRes.json();
        if (allData && allData.products) {
          const related = allData.products
            .filter((p) => p._id !== id && p.category === catName)
            .slice(0, 4);
          setRelatedProducts(related.length > 0 ? related : allData.products.filter((p) => p._id !== id).slice(0, 4));
        }
      } catch (err) {
        console.warn("Failed to fetch related items", err);
      }

      setLoading(false);
    } catch (error) {
      console.warn(`Fetch product failed: ${error.message}`);
      setError("Failed to load product. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getSelectedProducts();
  }, [id]);

  useEffect(() => {
    if (selectedProduct?.images?.primary) {
      setSelectedImage(selectedProduct.images.primary);
    }
    setQuantity(1);
    setSelectedSize("");
    setSelectedColor(null);
    setSelectedSizeQuantity(null);
  }, [selectedProduct]);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

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
  }, [selectedProduct]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const hasDiscount = selectedProduct?.discountRate > 0;

  return (
    <div className="bg-brandBg min-h-screen pt-28 pb-24">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {loading ? (
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">
            <div className="space-y-4">
              <div className="bg-gray-200 aspect-[3/4] w-full" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 h-24" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 w-1/4" />
              <div className="h-10 bg-gray-200 w-3/4" />
              <div className="h-6 bg-gray-200 w-1/3" />
              <div className="h-20 bg-gray-200 w-full" />
              <div className="h-12 bg-gray-200 w-full" />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="container-custom py-24 text-center">
          <p className="text-red-500">{error}</p>
          <Link to="/category" className="btn btn-secondary mt-6 inline-block">
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="container-custom">
          {/* Main Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            
            {/* 1. PDP Images Gallery (Left side - Columns 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className="aspect-[3/4] w-full relative overflow-hidden bg-white border border-gray-100 shadow-sm cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                <img
                  src={selectedImage || selectedProduct?.images?.primary}
                  alt={selectedProduct?.title}
                  className="w-full h-full object-cover"
                />
                {isZooming && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={selectedImage || selectedProduct?.images?.primary}
                      alt="Magnified suit cloth detail"
                      className="absolute w-full h-full object-cover scale-175"
                      style={{
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails list */}
              {selectedProduct?.images?.gallery && selectedProduct.images.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {selectedProduct.images.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-[3/4] overflow-hidden bg-white border ${
                        selectedImage === img ? "border-accent ring-1 ring-accent" : "border-gray-200/60"
                      } transition-all duration-300`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover hover:opacity-85" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. PDP Info Column (Right side - Columns 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold block mb-2">
                    Signature Tailoring
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl text-primary font-light tracking-wide leading-tight mb-3">
                    {selectedProduct?.title}
                  </h1>

                  {/* Price display */}
                  <div className="flex items-center gap-3">
                    {hasDiscount ? (
                      <>
                        <span className="text-gray-400 line-through text-sm font-light">
                          £{selectedProduct?.price?.toFixed(2)}
                        </span>
                        <span className="text-accent text-2xl font-bold tracking-wide">
                          £{selectedProduct?.discountedPrice?.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary text-2xl font-medium tracking-wide">
                        £{selectedProduct?.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {selectedProduct?.description}
                </p>

                <div className="h-[1px] bg-gray-100" />

                {/* Variants Panel */}
                {!isNoVariantProduct && (
                  <div className="space-y-6">
                    {/* Color selection */}
                    {allColors.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] tracking-widest font-semibold uppercase text-primary block">
                          Color: {selectedColor || "Select Color"}
                        </span>
                        <div className="flex gap-2.5 flex-wrap">
                          {allColors.map((color) => {
                            const isDisabled =
                              selectedSize &&
                              !selectedProduct.availableSizes.find(
                                (item) => item.size === selectedSize.size && item.color === color
                              );

                            return (
                              <button
                                key={color}
                                disabled={isDisabled}
                                onClick={() => handleColorSelect(color)}
                                className={`px-4 py-2.5 text-xs border tracking-widest transition-all duration-300 ${
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
                    {allSizes.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] tracking-widest font-semibold uppercase text-primary block">
                            Size: {selectedSize?.size || "Select Size"}
                          </span>
                          <button className="text-[10px] text-accent font-semibold tracking-wider hover:underline flex items-center gap-1">
                            <FiInfo size={12} /> Size & Fit Guide
                          </button>
                        </div>
                        <div className="flex gap-2.5 flex-wrap">
                          {allSizes.map((sizeValue) => {
                            const matchingVariants = selectedProduct.availableSizes.filter(
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
                                className={`px-4 py-2.5 text-xs border tracking-widest transition-all duration-300 ${
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
                  </div>
                )}

                {/* Stock Details indicator */}
                {selectedSizeQuantity > 0 && (
                  <span className="text-xs text-accent font-medium uppercase tracking-wider block">
                    Only {selectedSizeQuantity} suits left in stock
                  </span>
                )}

                {/* Quantity and Actions */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-6">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                      Quantity
                    </span>
                    <div className="flex items-center border border-gray-200 bg-white">
                      <button
                        className="p-3 text-gray-600 hover:text-primary transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-6 text-sm font-semibold select-none">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-widest uppercase py-4.5 transition-all duration-300"
                    >
                      Add To Cart
                    </button>
                    
                    <button
                      onClick={handleBuyNow}
                      className="bg-primary text-white border border-primary hover:bg-accent hover:text-primary hover:border-accent font-semibold text-xs tracking-widest uppercase py-4.5 transition-all duration-300 shadow-md"
                    >
                      Buy It Now
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100 pt-2" />

                {/* 3. Accordions (Details, Shipping) */}
                <div className="space-y-3 pt-2">
                  {/* Details Accordion */}
                  <div className="border border-gray-100 bg-white shadow-xs">
                    <button
                      onClick={() => toggleSection("details")}
                      className="w-full px-6 py-4 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-primary focus:outline-none"
                    >
                      <span>Garment Specifications</span>
                      {openSection === "details" ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </button>
                    {openSection === "details" && (
                      <div className="px-6 pb-6 text-xs text-gray-500 leading-relaxed font-light space-y-2">
                        <p>• Premium half-canvas jacket layout drafting a natural structured frame.</p>
                        <p>• Sourced from 100% fine worsted merino wool threads.</p>
                        <p>• Satin shawl lapels, double back vents, and custom fabric-wrapped buttons.</p>
                        <p>• Professional dry clean laundering recommended.</p>
                      </div>
                    )}
                  </div>

                  {/* Shipping Accordion */}
                  <div className="border border-gray-100 bg-white shadow-xs">
                    <button
                      onClick={() => toggleSection("shipping")}
                      className="w-full px-6 py-4 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-primary focus:outline-none"
                    >
                      <span>Shipping & Exchanges</span>
                      {openSection === "shipping" ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </button>
                    {openSection === "shipping" && (
                      <div className="px-6 pb-6 text-xs text-gray-500 leading-relaxed font-light space-y-2">
                        <p>• <strong>UK Mainland:</strong> Express shipping next-day tracked delivery (Free on orders over £500).</p>
                        <p>• <strong>International:</strong> Tracked FedEx/DHL transit (approx 3-5 business days).</p>
                        <p>• <strong>Returns:</strong> 14-day complimentary exchanges in original dust bag wraps.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* 4. Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-100 pt-20">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold block">
                  Completing The Look
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-primary font-light">
                  Related Sartorial Pieces
                </h3>
                <div className="h-[1px] w-10 bg-accent mx-auto mt-3" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default ProductDetail;
