import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import axios from "axios";

function Categories() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([
    {
      "id": "1",
      "title": "Product 1",
      "price": 5.0,
      "description": "Description for Product 1.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+1",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "2",
      "title": "Product 2",
      "price": 5.5,
      "description": "Description for Product 2.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+2",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "3",
      "title": "Product 3",
      "price": 6.0,
      "description": "Description for Product 3.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+3",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "4",
      "title": "Product 4",
      "price": 6.5,
      "description": "Description for Product 4.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+4",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "5",
      "title": "Product 5",
      "price": 7.0,
      "description": "Description for Product 5.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+5",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "6",
      "title": "Product 6",
      "price": 7.5,
      "description": "Description for Product 6.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+6",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "7",
      "title": "Product 7",
      "price": 8.0,
      "description": "Description for Product 7.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+7",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "8",
      "title": "Product 8",
      "price": 8.5,
      "description": "Description for Product 8.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+8",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "9",
      "title": "Product 9",
      "price": 9.0,
      "description": "Description for Product 9.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+9",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "10",
      "title": "Product 10",
      "price": 9.5,
      "description": "Description for Product 10.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+10",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "11",
      "title": "Product 11",
      "price": 10.0,
      "description": "Description for Product 11.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+11",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "12",
      "title": "Product 12",
      "price": 10.5,
      "description": "Description for Product 12.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+12",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "13",
      "title": "Product 13",
      "price": 11.0,
      "description": "Description for Product 13.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+13",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "14",
      "title": "Product 14",
      "price": 11.5,
      "description": "Description for Product 14.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+14",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "15",
      "title": "Product 15",
      "price": 12.0,
      "description": "Description for Product 15.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+15",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "16",
      "title": "Product 16",
      "price": 12.5,
      "description": "Description for Product 16.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+16",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "17",
      "title": "Product 17",
      "price": 13.0,
      "description": "Description for Product 17.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+17",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "18",
      "title": "Product 18",
      "price": 13.5,
      "description": "Description for Product 18.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+18",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "19",
      "title": "Product 19",
      "price": 14.0,
      "description": "Description for Product 19.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+19",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "20",
      "title": "Product 20",
      "price": 14.5,
      "description": "Description for Product 20.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+20",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "21",
      "title": "Product 21",
      "price": 15.0,
      "description": "Description for Product 21.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+21",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "22",
      "title": "Product 22",
      "price": 15.5,
      "description": "Description for Product 22.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+22",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "23",
      "title": "Product 23",
      "price": 16.0,
      "description": "Description for Product 23.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+23",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "24",
      "title": "Product 24",
      "price": 16.5,
      "description": "Description for Product 24.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+24",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    },
    {
      "id": "25",
      "title": "Product 25",
      "price": 17.0,
      "description": "Description for Product 25.",
      "images": {
        "primary": "https://via.placeholder.com/800x1000?text=Product+25",
        "gallery": [
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+4"
        ]
      },
      "availableSizes": [],
      "defaultQuantity": 1
    }
  ]
  );

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Our Collection</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn btn-primary flex items-center gap-2"
        >
          {showFilters ? <FiX /> : <FiFilter />}
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 space-y-6`}
        >
          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              {["All", "Tuxedos", "Suits", "Shirts", "Accessories"].map(
                (category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.toLowerCase()}
                      checked={selectedCategory === category.toLowerCase()}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-serif text-lg mb-3">Price Range</h3>
            <div className="space-y-2">
              {[
                { label: "All", value: "all" },
                { label: "Under $500", value: "under-500" },
                { label: "$500 - $1000", value: "500-1000" },
                { label: "Over $1000", value: "over-1000" },
              ].map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={range.value}
                    checked={priceRange === range.value}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.images.primary}
                      alt="Product"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{item.price}</p>
                    <button className="btn btn-primary w-full">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
