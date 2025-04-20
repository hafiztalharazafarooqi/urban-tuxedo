import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HeroSection() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/promotions`);

        if (!response.ok) {
          throw new Error("Failed to fetch promotions");
        }

        const data = await response.json();
        setPromotions(data.promotion || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Failed to load promotional content");
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [BACKEND_URL]);

  useEffect(() => {
    // Auto-advance slides
    if (promotions.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [promotions.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  }, [promotions.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + promotions.length) % promotions.length
    );
  }, [promotions.length]);

  // Don't render anything if there are no promotions
  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center text-center bg-gray-100">
        {/* <div className="text-xl text-gray-500">Loading promotions...</div> */}
      </section>
    );
  }

  if (error || promotions.length === 0) {
    // If no promotions, render the default HeroSection instead
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
            Discover premium fashion crafted for the modern individual who
            demands both elegance and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category"
              className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel slides */}
      <div className="h-full relative">
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative h-full w-full">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${promo.image}')` }}
              ></div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                  <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
                    Elevate Your <span className="text-red-400">Style</span>{" "}
                    Journey
                  </h1>
                  <p className="text-xl mb-8 text-gray-200 max-w-xl mx-auto">
                    Discover premium fashion crafted for the modern individual
                    who demands both elegance and comfort.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/category"
                      className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Shop Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      {promotions.length > 1 && (
        <>
          {/* Left/Right arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default HeroSection;
