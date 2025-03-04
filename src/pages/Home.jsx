// import HeroSection from "../components/HeroSection";

import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";
import NewsLetterSection from "../components/NewsLetterSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <FeatureSection />;
      <FeaturedProducts />
      <NewsLetterSection />
    </div>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, Shield, Clock, ChevronRight } from "lucide-react";

// function Home() {
//   const [featureProducts, setFeatureProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const BACKEND_URL = import.meta.env.VITE_API_URL;
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getProducts();
// 	getCategories();
//   }, []);

//   const getCategories = async () => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/categories`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       setCategories(data.categories);
//       setLoading(false);
//     } catch (error) {
//       console.warn(`Failed to fetch categories: ${error.message}`);
//       setError("Failed to load categories. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const getProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://urban-tuxedo-backend.vercel.app/api/products"
//       );
//       const data = await response.json();
//       setFeatureProducts(data.products.filter((item) => item.isFeatured));
//     } catch (error) {
//       console.error("Fetching products failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section - Full height, gradient overlay */}
//       <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-fixed">
//         <div
//           className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-0"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')",
//             backgroundBlendMode: "overlay",
//           }}
//         ></div>
//         <div className="relative z-10 max-w-3xl mx-auto px-6">
//           <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
//             Elevate Your <span className="text-red-400">Style</span> Journey
//           </h1>
//           <p className="text-xl mb-8 text-gray-200 max-w-xl mx-auto">
//             Discover premium fashion crafted for the modern individual who demands
//             both elegance and comfort.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/category"
//               className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               Shop Collection
//             </Link>
//             <Link
//               to="/about"
//               className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>
//         <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
//           <ChevronRight className="h-8 w-8 text-white transform rotate-90" />
//         </div>
//       </section>

//       {/* Category Section - NEW */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-4">Shop By Category</h2>
//           <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//             Browse our curated collections to find exactly what you&apos;re looking for
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category) => (
//               <Link
//                 key={category.id}
//                 to={category.path}
//                 className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
//               >
//                 <div className="aspect-[3/4] overflow-hidden">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
//                   <span className="inline-flex items-center text-sm font-medium text-white border-b border-white/50 pb-1 group-hover:border-white transition-all">
//                     Explore Collection <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Card design with hover effects */}
//       <section className="py-24 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us</h2>
//           <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//             We provide a premium shopping experience from browsing to delivery
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
//                 <ShoppingCart className="text-red-500 h-8 w-8 group-hover:text-white transition" />
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-3">Seamless Shopping</h3>
//               <p className="text-gray-600 text-center">
//                 Our intuitive platform makes finding and purchasing your perfect style effortless.
//               </p>
//             </div>

//             <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
//                 <Shield className="text-red-500 h-8 w-8 group-hover:text-white transition" />
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-3">Guaranteed Security</h3>
//               <p className="text-gray-600 text-center">
//                 Shop with confidence knowing your payments and data are protected.
//               </p>
//             </div>

//             <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
//                 <Clock className="text-red-500 h-8 w-8 group-hover:text-white transition" />
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-3">Express Delivery</h3>
//               <p className="text-gray-600 text-center">
//                 We prioritize quick shipping so you can enjoy your purchases sooner.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products - Card design with hover effects */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900">Featured Collection</h2>
//               <p className="text-gray-600 mt-2">Discover our most coveted pieces</p>
//             </div>
//             <Link
//               to="/category"
//               className="hidden md:flex items-center text-red-500 font-medium hover:text-red-700 transition"
//             >
//               View all products
//               <ChevronRight className="h-5 w-5 ml-1" />
//             </Link>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
//                   <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
//                   <div className="h-10 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {featureProducts.map((product) => (
//                 <Link
//                   key={product._id}
//                   to={`/product/${product._id}`}
//                   className="group"
//                 >
//                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={product.image.primary}
//                         alt={product.title}
//                         className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
//                       />
//                       <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition duration-300">
//                         <p className="text-white font-medium">View Details</p>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg font-medium text-gray-800 group-hover:text-red-500 transition">
//                           {product.title}
//                         </h3>
//                         <p className="text-red-500 text-lg font-bold">
//                           ${product.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//           <div className="mt-12 text-center md:hidden">
//             <Link
//               to="/category"
//               className="inline-flex items-center text-red-500 font-medium hover:text-red-700 transition"
//             >
//               View all products
//               <ChevronRight className="h-5 w-5 ml-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-20 bg-red-500 text-white">
//         <div className="container mx-auto px-6">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl font-bold mb-4">Join Our Style Community</h2>
//             <p className="mb-8">Subscribe to receive exclusive offers, early access to new collections, and style inspiration.</p>
//             <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
//               />
//               <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
