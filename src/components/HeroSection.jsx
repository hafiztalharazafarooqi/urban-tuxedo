import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-fixed">
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')",
          backgroundBlendMode: "overlay",
        }}
      ></div>
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
          Elevate Your <span className="text-red-400">Style</span> Journey
        </h1>
        <p className="text-xl mb-8 text-gray-200 max-w-xl mx-auto">
          Discover premium fashion crafted for the modern individual who demands
          both elegance and comfort.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/category"
            className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Shop Collection
          </Link>
          {/* <Link
            to="/about"
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition"
          >
            Our Story
          </Link> */}
        </div>
      </div>
      {/* <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <ChevronRight className="h-8 w-8 text-white transform rotate-90" />
      </div> */}
    </section>
  );
}

export default HeroSection;
