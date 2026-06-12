import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { toast } from "react-toastify";

function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success("Thank you for subscribing to our journal.", { theme: "dark" });
      e.target.reset();
    }
  };

  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="container-custom">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-center md:text-left">
          
          {/* Brand & Story */}
          <div className="space-y-6">
            <span className="font-serif text-lg tracking-[0.15em] uppercase text-white block">
              Urban Tuxedo
            </span>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Crafting sartorial excellence for the modern gentleman. We specialize in luxury tuxedos, wedding suits, and bespoke formal wear designed to make an indelible impression.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-gray-400 hover:text-white">
              <a href="https://instagram.com" className="hover:text-accent transition-colors" aria-label="Instagram"><FiInstagram size={16} /></a>
              <a href="https://facebook.com" className="hover:text-accent transition-colors" aria-label="Facebook"><FiFacebook size={16} /></a>
              <a href="https://twitter.com" className="hover:text-accent transition-colors" aria-label="Twitter"><FiTwitter size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-wider uppercase text-white font-medium">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-light">
              <li><Link to="/" className="hover:text-accent transition-colors luxury-link">Home</Link></li>
              <li><Link to="/category" className="hover:text-accent transition-colors luxury-link">Shop Collections</Link></li>
              <li><Link to="/cart" className="hover:text-accent transition-colors luxury-link">Shopping Cart</Link></li>
              <li><Link to="/profile" className="hover:text-accent transition-colors luxury-link">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-wider uppercase text-white font-medium">
              Services
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-light">
              <li><span className="hover:text-accent cursor-pointer transition-colors luxury-link">Fit & Size Guide</span></li>
              <li><span className="hover:text-accent cursor-pointer transition-colors luxury-link">Shipping & Delivery</span></li>
              <li><span className="hover:text-accent cursor-pointer transition-colors luxury-link">Returns & Exchanges</span></li>
              <li><span className="hover:text-accent cursor-pointer transition-colors luxury-link">Sartorial Journal</span></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-wider uppercase text-white font-medium">
              The Journal
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Subscribe to receive private collection previews, runway news, and tailoring journal updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative border-b border-white/20 focus-within:border-accent transition-colors duration-300">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent border-none outline-none py-2 text-xs tracking-wider text-white placeholder-gray-500 focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                aria-label="Subscribe"
              >
                <FiArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-gray-400 font-light">
          
          {/* Company Registry Info */}
          <div className="space-y-1">
            <p className="font-medium text-white/70">M&A TRADAX LIMITED</p>
            <p>69 Wilshaw Lane, Ashton-Under-Lyne, OL7 9QX, United Kingdom</p>
            <p className="text-[10px] text-gray-500">Registered in England & Wales</p>
          </div>

          {/* Payment Badges (Minimal/Monochrome) */}
          <div className="flex items-center gap-3">
            {["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "PAYPAL"].map((badge) => (
              <span
                key={badge}
                className="border border-white/10 px-2 py-1 text-[8px] tracking-widest text-white/50 bg-white/5 font-semibold font-sans rounded-xs"
              >
                {badge}
              </span>
            ))}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-[10px] text-gray-600 font-light">
          <p>&copy; {new Date().getFullYear()} Urban Tuxedo. All rights reserved. Designed for sartorial excellence.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;