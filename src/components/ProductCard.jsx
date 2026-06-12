import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

function ProductCard({ product, onQuickView, onWishlistToggle }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.some((item) => item._id === product._id));
  }, [product._id]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex((item) => item._id === product._id);
    let updated;

    if (index > -1) {
      wishlist.splice(index, 1);
      setIsInWishlist(false);
      toast.success("Removed from wishlist", { theme: "dark" });
    } else {
      wishlist.push(product);
      setIsInWishlist(true);
      toast.success("Saved to wishlist", { theme: "dark" });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-update"));
    if (onWishlistToggle) onWishlistToggle();
  };

  // Determine pricing display
  const hasDiscount = product.discountRate > 0;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 rounded-none border border-gray-100/60">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
        <Link to={`/product/${product._id}`} className="block h-full w-full">
          {/* Primary Image */}
          <img
            src={product.images.primary}
            alt={product.title}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              product.images.gallery && product.images.gallery.length > 0
                ? "group-hover:opacity-0 group-hover:scale-105"
                : "group-hover:scale-105"
            }`}
            loading="lazy"
          />

          {/* Hover/Gallery Image */}
          {product.images.gallery && product.images.gallery.length > 0 && (
            <img
              src={product.images.gallery[0]}
              alt={`${product.title} alternate`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <span className="bg-primary text-white text-[10px] tracking-widest font-semibold px-3 py-1 uppercase rounded-none">
              Signature
            </span>
          )}
          {hasDiscount && (
            <span className="bg-accent text-primary text-[10px] tracking-widest font-semibold px-3 py-1 uppercase rounded-none">
              -{product.discountRate}%
            </span>
          )}
        </div>

        {/* Interactive Hover Actions Menu */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <button
            onClick={handleWishlistClick}
            className={`p-3 bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md ${
              isInWishlist ? "text-accent fill-accent" : "text-primary"
            }`}
            title="Save to Wishlist"
            aria-label="Wishlist"
          >
            <FiHeart size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
            title="Quick View"
            aria-label="Quick View"
          >
            <FiEye size={16} />
          </button>

          <Link
            to={`/product/${product._id}`}
            className="p-3 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
            title="View Details"
          >
            <FiShoppingBag size={16} />
          </Link>
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 p-5 text-center bg-white">
        <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-1">
          Urban Tuxedo
        </span>
        <h3 className="font-serif text-[15px] text-primary tracking-wide mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300">
          <Link to={`/product/${product._id}`}>{product.title}</Link>
        </h3>
        
        {/* Pricing */}
        <div className="mt-auto flex justify-center items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-xs font-light">
                £{product.price.toFixed(2)}
              </span>
              <span className="text-accent text-sm font-semibold tracking-wide">
                £{product.discountedPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-primary text-sm font-medium tracking-wide">
              £{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
