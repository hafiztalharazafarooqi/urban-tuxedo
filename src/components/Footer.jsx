import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif mb-4">M&A TRADAX LIMITED</h3>
            <p className="text-gray-300 mb-4">
              Bringing you the finest formal wear since 2020
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://instagram.com" className="hover:text-gold transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-gold transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-gold transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/category" className="text-gray-300 hover:text-gold transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-gold transition-colors">Cart</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-gold transition-colors">Account</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-serif mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-end">
                <FiMapPin className="mr-2" />
                <span className="text-gray-300">69 Wilshaw Lane, Ashton-Under-Lyne, OL7 9QX</span>
              </li>
              <li className="flex items-center justify-center md:justify-end">
                <FiPhone className="mr-2" />
                <a href="tel:+441234567890" className="text-gray-300 hover:text-gold transition-colors">+44 123 456 7890</a>
              </li>
              <li className="flex items-center justify-center md:justify-end">
                <FiMail className="mr-2" />
                <a href="mailto:info@urbantuxedo.com" className="text-gray-300 hover:text-gold transition-colors">info@urbantuxedo.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2025 Urban Tuxedo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;