import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-4">
            <img
              src={`https://source.unsplash.com/random/800x1000/?tuxedo&sig=${id}`}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <img
                key={index}
                src={`https://source.unsplash.com/random/200x200/?tuxedo&sig=${id}-${index}`}
                alt={`Product view ${index}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-serif mb-4">Classic Black Tuxedo</h1>
          <p className="text-2xl text-gold mb-6">$599.99</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-lg mb-2">Description</h3>
              <p className="text-gray-600">
                Elevate your formal attire with our signature Classic Black Tuxedo. 
                Crafted from premium wool blend fabric, featuring satin lapels and 
                meticulous tailoring for a perfect fit.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-serif text-lg mb-2">Select Size</h3>
              <div className="flex gap-4">
                {['38R', '40R', '42R', '44R', '46R'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-white'
                        : 'border-gray-300 hover:border-gold'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-serif text-lg mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  className="btn btn-primary px-4"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  className="btn btn-primary px-4"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="btn btn-gold w-full py-3">
                Add to Cart
              </button>
              <button className="btn btn-primary w-full py-3">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;