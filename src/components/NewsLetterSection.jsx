
function NewsLetterSection() {
  return (
    <section className="py-20 bg-red-500 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Style Community</h2>
          <p className="mb-8">
            Subscribe to receive exclusive offers, early access to new
            collections, and style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetterSection;
