import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

function ProfileWshlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    const stored = localStorage.getItem("wishlist");
    setWishlist(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlist-update", loadWishlist);
    return () => window.removeEventListener("wishlist-update", loadWishlist);
  }, []);

  return (
    <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-primary tracking-wide">
          My Saved Wishlist
        </h2>
        <span className="text-[10px] tracking-widest bg-accent/20 text-accent font-semibold px-2 py-0.5 font-sans">
          {wishlist.length} Items
        </span>
      </div>

      <div className="p-8 bg-white">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {wishlist.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onWishlistToggle={loadWishlist}
                onQuickView={() => {}} // Disabled quick view in profile page for safety, details redirects
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 max-w-sm mx-auto space-y-6">
            <div className="w-16 h-16 bg-brandBg border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <FiHeart className="h-6 w-6 text-gray-300" />
            </div>
            <h3 className="font-serif text-base text-primary">Your Wishlist is Empty</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Save items you love to compile your personal tailoring wishlist, so you never miss out on your favorite cuts.
            </p>
            <div className="pt-2">
              <Link
                to="/category"
                className="btn btn-secondary text-[10px] tracking-widest px-6 py-3"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileWshlist;
