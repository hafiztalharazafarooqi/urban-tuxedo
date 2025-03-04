import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative h-[80vh] bg-gray-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative container-custom h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">Elegance Redefined</h1>
          <p className="text-xl mb-8">
            Discover our premium collection of handcrafted tuxedos and formal
            wear.
          </p>
          <Link to="/category" className="btn btn-gold">
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
