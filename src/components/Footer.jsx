import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="gap-8">
          {/* Company Info */}
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">M&A TRADAX LIMITED</h3>
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
