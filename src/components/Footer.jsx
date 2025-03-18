function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif mb-4">M&A TRADAX LIMITED</h3>
            <p>69 Wilshaw Lane</p>
            <p>Ashton-Under-Lyne</p>
            <p>OL7 9QX, United Kingdom</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/category" className="hover:underline">Shop</a></li>
              <li><a href="/cart" className="hover:underline">Cart</a></li>
              <li><a href="/profile" className="hover:underline">My Account</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          {/* <div>
            <h3 className="text-xl font-serif mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:support@urbantuxedo.co.uk" className="hover:underline">support@urbantuxedo.co.uk</a></p>
            <p>Phone: <a href="tel:+441234567890" className="hover:underline">+44 123 456 7890</a></p>
          </div> */}
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Urban Tuxedo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;