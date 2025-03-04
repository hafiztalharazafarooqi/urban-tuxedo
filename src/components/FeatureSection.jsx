import { Clock, Shield, ShoppingCart } from "lucide-react";

function FeatureSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          We provide a premium shopping experience from browsing to delivery
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
              <ShoppingCart className="text-red-500 h-8 w-8 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Seamless Shopping
            </h3>
            <p className="text-gray-600 text-center">
              Our intuitive platform makes finding and purchasing your perfect
              style effortless.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
              <Shield className="text-red-500 h-8 w-8 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Guaranteed Security
            </h3>
            <p className="text-gray-600 text-center">
              Shop with confidence knowing your payments and data are protected.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500 transition">
              <Clock className="text-red-500 h-8 w-8 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Express Delivery
            </h3>
            <p className="text-gray-600 text-center">
              We prioritize quick shipping so you can enjoy your purchases
              sooner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
