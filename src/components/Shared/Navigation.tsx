import { ChevronDown, Menu, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-50">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BrandName</h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-black flex items-center">
            Product <ChevronDown className="ml-1" size={16} />
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-black">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ShoppingBag className="cursor-pointer" />
          <User className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
          <Menu className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {/* Profile Menu */}
      {profileOpen && (
        <div className="absolute right-6 mt-2 bg-white shadow-lg p-4 rounded-lg">
          <p className="text-gray-800">Welcome, User</p>
          <Link to="/profile" className="block mt-2 text-gray-600 hover:text-black">
            Profile
          </Link>
          <Link to="/orders" className="block mt-2 text-gray-600 hover:text-black">
            Orders
          </Link>
          <Link to="/logout" className="block mt-2 text-gray-600 hover:text-black">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;


// import { ChevronDown, Menu, ShoppingBag, User } from "lucide-react";
// import { useState } from "react";

// const Navigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   return (
//     <div className="font-sans bg-gray-50">
//       <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">BrandName</h1>
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="text-gray-700 hover:text-black">
//             Home
//           </a>
//           <a
//             href="#"
//             className="text-gray-700 hover:text-black flex items-center"
//           >
//             Shop <ChevronDown className="ml-1" size={16} />
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Contact
//           </a>
//         </div>
//         <div className="flex items-center space-x-4">
//           <ShoppingBag className="cursor-pointer" />
//           <User
//             className="cursor-pointer"
//             onClick={() => setProfileOpen(!profileOpen)}
//           />
//           <Menu
//             className="md:hidden cursor-pointer"
//             onClick={() => setMenuOpen(!menuOpen)}
//           />
//         </div>
//       </nav>

//       {/* Profile Menu */}
//       {profileOpen && (
//         <div className="absolute right-6 mt-2 bg-white shadow-lg p-4 rounded-lg">
//           <p className="text-gray-800">Welcome, User</p>
//           <a href="#" className="block mt-2 text-gray-600 hover:text-black">
//             Profile
//           </a>
//           <a href="#" className="block mt-2 text-gray-600 hover:text-black">
//             Orders
//           </a>
//           <a href="#" className="block mt-2 text-gray-600 hover:text-black">
//             Logout
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navigation;
