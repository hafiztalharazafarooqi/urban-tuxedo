import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Urban Tuxedo</h3>
            <p className="text-gray-300">
              Elevating your style with premium formal wear since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-300 hover:text-gold">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-300 hover:text-gold">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-gold">Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold text-xl">
                <FiInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold text-xl">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold text-xl">
                <FiTwitter />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2024 Urban Tuxedo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;