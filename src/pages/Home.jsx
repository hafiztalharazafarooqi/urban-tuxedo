import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiShield, FiTruck } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

// Fallback high-end slides if API fails or has no entries
const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80",
    title: "Sartorial Excellence",
    subtitle: "Tuxedos and suits hand-finished with exceptional Italian craftsmanship.",
    ctaText: "Discover Suitings",
    link: "/category"
  },
  {
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1920&q=80",
    title: "The Wedding Edit",
    subtitle: "Impeccable formal attire designed for life's most memorable celebrations.",
    ctaText: "Explore Collection",
    link: "/category"
  },
  {
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1920&q=80",
    title: "Signature Tailoring",
    subtitle: "Modern fits, structured lines, and lightweight, premium wool canvassing.",
    ctaText: "Shop Blazers",
    link: "/category"
  }
];

const REVIEWS = [
  {
    text: "The velvet tuxedo exceeded all my expectations. The fit was absolutely immaculate, and the hand-feel of the cloth represents true luxury.",
    author: "Edward V. - London"
  },
  {
    text: "Urban Tuxedo made styling our wedding party suits seamless. The half-canvas drape is superior to anything else in my wardrobe.",
    author: "Arthur K. - New York"
  },
  {
    text: "Concierge styling suggestions helped me choose the perfect size. Worldwide tracking was fast and the garment bag packaging is exquisite.",
    author: "Sébastien L. - Paris"
  }
];

function Home() {
  const [promotions, setPromotions] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  // Fetch promotions & best sellers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch promotions
        const promoRes = await fetch(`${BACKEND_URL}/promotions`);
        if (promoRes.ok) {
          const promoData = await promoRes.json();
          if (promoData.promotion && promoData.promotion.length > 0) {
            setPromotions(promoData.promotion);
          }
        }
      } catch (e) {
        console.warn("Failed to load promotions API, using high-end defaults", e);
      }

      try {
        // Fetch products for Best Sellers
        const prodRes = await fetch(`${BACKEND_URL}/products`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.products) {
            // Filter isFeatured or take first 4
            const featured = prodData.products.filter(item => item.isFeatured);
            setBestSellers(featured.length > 0 ? featured.slice(0, 4) : prodData.products.slice(0, 4));
          }
        }
      } catch (e) {
        console.warn("Failed to load products API", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_URL]);

  // Slides auto advance
  const activeSlides = promotions.length > 0 ? promotions : HERO_SLIDES;
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  return (
    <div className="relative w-full">
      {/* 1. Luxury Hero Banner */}
      <section className="relative h-screen w-full overflow-hidden bg-primary text-white">
        <div className="h-full w-full relative">
          {activeSlides.map((slide, idx) => {
            // Check if slide contains API structure or Fallback structure
            const slideImg = slide.image || slide.image;
            const slideTitle = slide.title || "Elevate Your Style Journey";
            const slideSub = slide.subtitle || "Discover premium fashion crafted for the modern gentleman.";
            const slideCta = slide.ctaText || "Shop Collections";
            const slideLink = slide.link || "/category";

            return (
              <div
                key={idx}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Background image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-100 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${slideImg}')`,
                  }}
                />
                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/45" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-3xl px-6 space-y-6 md:space-y-8 animate-fade-in-up">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-bold block">
                      Urban Tuxedo Signature
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl leading-tight font-light tracking-wide text-white">
                      {slideTitle}
                    </h1>
                    <p className="text-sm md:text-lg text-gray-200 max-w-xl mx-auto font-light leading-relaxed">
                      {slideSub}
                    </p>
                    <div className="pt-4">
                      <Link
                        to={slideLink}
                        className="inline-block bg-accent hover:bg-white text-primary font-semibold text-xs tracking-widest uppercase px-10 py-4.5 transition-all duration-300 hover:shadow-xl"
                      >
                        {slideCta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sliders arrows */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/55 hover:text-white transition-colors duration-300 p-2 z-20 focus:outline-none"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={28} />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/55 hover:text-white transition-colors duration-300 p-2 z-20 focus:outline-none"
              aria-label="Next slide"
            >
              <FiChevronRight size={28} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-3.5 z-20">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[2px] transition-all duration-500 ${
                    currentSlide === idx ? "bg-accent w-10" : "bg-white/30 w-5"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 2. Featured Collections */}
      <section className="py-24 bg-brandBg">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold block">
              Curated Lines
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-light">
              Shop By Signature Collections
            </h2>
            <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tuxedos */}
            <Link
              to="/category/tuxedos"
              className="group relative h-[450px] overflow-hidden bg-gray-100 flex flex-col justify-end p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1592878849122-facb97756fa3?auto=format&fit=crop&w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="relative space-y-2 text-white">
                <span className="text-[9px] tracking-widest text-accent uppercase font-bold">Black Tie Event</span>
                <h3 className="font-serif text-xl tracking-wide font-medium">Tuxedos & Dinner Jackets</h3>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest border-b border-white/40 pb-1 group-hover:border-white transition-all duration-300 pt-2">
                  Explore Collection
                </span>
              </div>
            </Link>

            {/* Wedding Suits */}
            <Link
              to="/category"
              className="group relative h-[450px] overflow-hidden bg-gray-100 flex flex-col justify-end p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="relative space-y-2 text-white">
                <span className="text-[9px] tracking-widest text-accent uppercase font-bold">The Wedding Edit</span>
                <h3 className="font-serif text-xl tracking-wide font-medium">Wedding Suits & Tailoring</h3>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest border-b border-white/40 pb-1 group-hover:border-white transition-all duration-300 pt-2">
                  Explore Collection
                </span>
              </div>
            </Link>

            {/* Blazers */}
            <Link
              to="/category"
              className="group relative h-[450px] overflow-hidden bg-gray-100 flex flex-col justify-end p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="relative space-y-2 text-white">
                <span className="text-[9px] tracking-widest text-accent uppercase font-bold">Sartorial Detail</span>
                <h3 className="font-serif text-xl tracking-wide font-medium">Blazers & Casual Attire</h3>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest border-b border-white/40 pb-1 group-hover:border-white transition-all duration-300 pt-2">
                  Explore Collection
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Best Sellers / Featured Products */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold block">
                The Selection
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-light">
                Urban Tuxedo Best Sellers
              </h2>
            </div>
            <Link
              to="/category"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent pb-1 border-b border-primary hover:border-accent transition-colors duration-300"
            >
              View All Tailoring
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-100 aspect-[3/4] mb-4" />
                  <div className="h-4 bg-gray-100 w-1/3 mx-auto mb-2" />
                  <div className="h-4 bg-gray-100 w-2/3 mx-auto mb-2" />
                  <div className="h-4 bg-gray-100 w-1/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : bestSellers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={(p) => setSelectedQuickView(p)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xs">No products currently listed.</p>
          )}
        </div>
      </section>

      {/* 4. Wedding Collection Showcase (Editorial layout) */}
      <section className="py-24 bg-brandBg border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story block */}
            <div className="space-y-6 lg:max-w-md mx-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold block">
                Occasions
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-light leading-tight">
                The Wedding Suit Edit
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                From morning dress coats to signature midnight blue tuxedos, our wedding collections are crafted for style, longevity, and memory. Made from luxury lightweight cloths, every suit delivers ease of movement, breathing capability, and absolute grace.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Explore tailoring options curated for modern grooms, best men, and bridal parties.
              </p>
              <div className="pt-4">
                <Link
                  to="/category"
                  className="btn btn-primary text-xs tracking-widest"
                >
                  Explore Wedding Wear
                </Link>
              </div>
            </div>

            {/* Media Block */}
            <div className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury wedding ceremony details"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Editorial Content Section */}
      <section className="relative h-[480px] w-full bg-primary flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        
        <div className="relative z-10 max-w-2xl px-6 text-center space-y-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-bold">
            The Craft
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light">
            Designed to Inspire Absolute Confidence
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed font-light max-w-lg mx-auto">
            A jacket is only as beautiful as the canvas inside it. We combine high-thread fabrics, structured linings, and precision drape profiles to guarantee elegance that stands the test of time.
          </p>
          <div className="pt-2">
            <Link
              to="/category"
              className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white pb-1 border-b border-accent hover:border-white transition-colors duration-300"
            >
              The Fitting & Care Guide
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Trust & Quality Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="text-center space-y-4 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center mx-auto text-accent mb-2">
                <FiCheckCircle size={20} />
              </div>
              <h4 className="font-serif text-base font-medium text-primary">Sartorial Quality</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                We select wool and blends directly from renowned European mills, ensuring durable wear and luxury finishes.
              </p>
            </div>

            <div className="text-center space-y-4 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center mx-auto text-accent mb-2">
                <FiShield size={20} />
              </div>
              <h4 className="font-serif text-base font-medium text-primary">Secure checkout</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                All client transactional details are fully encrypted under premium SSL safety standards.
              </p>
            </div>

            <div className="text-center space-y-4 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center mx-auto text-accent mb-2">
                <FiTruck size={20} />
              </div>
              <h4 className="font-serif text-base font-medium text-primary">Worldwide express</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                Tracked courier service guarantees prompt arrival, packed meticulously inside dust-proof garment bags.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Customer Reviews (Slider/Tab layout) */}
      <section className="py-24 bg-brandBg">
        <div className="container-custom text-center">
          <div className="space-y-2 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
              Guest Testimonials
            </span>
            <h2 className="font-serif text-3xl font-light text-primary">
              The Gentlemen's Circle
            </h2>
          </div>

          <div className="max-w-2xl mx-auto h-[160px] flex flex-col justify-between">
            <p className="font-serif italic text-lg md:text-xl text-primary font-light leading-relaxed">
              "{REVIEWS[activeReview].text}"
            </p>
            <span className="text-[11px] uppercase tracking-widest text-accent font-bold block pt-4">
              — {REVIEWS[activeReview].author}
            </span>
          </div>

          {/* Dots controller */}
          <div className="flex justify-center space-x-3.5 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReview(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeReview === idx ? "bg-accent scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 8. Instagram/Social Gallery */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold block">
              Inspiration
            </span>
            <h2 className="font-serif text-3xl font-light text-primary">
              Sartorial Portraits
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Follow our aesthetic journey. Tag @UrbanTuxedo to be showcased.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=400",
              "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=400",
              "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&h=400",
              "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=400&h=400"
            ].map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden bg-gray-100 group shadow-sm hover:shadow-lg transition-all duration-500">
                <img
                  src={img}
                  alt="Suit portrait detail"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Quick View overlay on Home page */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}

export default Home;
