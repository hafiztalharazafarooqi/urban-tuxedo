import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../UI/Button";
import { Card } from "../UI/Card";
import { CardContent } from "../UI/Card-Content";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Navigation */}
        {/* Product Image Gallery */}
        <div>
          <img
            src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
            alt="Product"
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex gap-2 mt-4">
            <img
              src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
              alt="Thumbnail 1"
              className="w-20 h-20 rounded-md cursor-pointer border"
            />
            <img
              src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
              alt="Thumbnail 2"
              className="w-20 h-20 rounded-md cursor-pointer border"
            />
            <img
              src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
              alt="Thumbnail 3"
              className="w-20 h-20 rounded-md cursor-pointer border"
            />
          </div>
        </div>

        {/* Product Details */}
        <Card className="p-6">
          <CardContent>
            <h1 className="text-3xl font-bold mb-2">Premium Cotton T-Shirt</h1>
            <div className="flex items-center mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
              <span className="text-gray-600 ml-2">(120 Reviews)</span>
            </div>
            <p className="text-gray-600 mb-4">
              This premium quality cotton t-shirt is soft, breathable, and
              perfect for casual wear.
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-4">$25.00</p>

            {/* Size Selector */}
            <div className="mb-4">
              <p className="font-medium mb-2">Select Size:</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-gray-800 text-white"
                        : "bg-gray-400"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="font-medium mb-2">Select Color:</p>
              <div className="flex gap-2">
                {["Black", "White", "Blue"].map((color) => (
                  <Button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? "bg-gray-800 text-white"
                        : "bg-gray-400"
                    }`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-blue-600 text-white py-3 text-lg rounded-md hover:bg-blue-700">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;
