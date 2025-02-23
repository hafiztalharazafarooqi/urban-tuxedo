import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  // const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Product 1",
      price: 5.0,
      description: "Description for Product 1.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+1",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+1+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "2",
      title: "Product 2",
      price: 5.5,
      description: "Description for Product 2.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+2",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+2+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "3",
      title: "Product 3",
      price: 6.0,
      description: "Description for Product 3.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+3",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+3+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "4",
      title: "Product 4",
      price: 6.5,
      description: "Description for Product 4.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+4",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+4+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "5",
      title: "Product 5",
      price: 7.0,
      description: "Description for Product 5.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+5",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+5+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "6",
      title: "Product 6",
      price: 7.5,
      description: "Description for Product 6.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+6",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+6+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "7",
      title: "Product 7",
      price: 8.0,
      description: "Description for Product 7.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+7",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+7+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "8",
      title: "Product 8",
      price: 8.5,
      description: "Description for Product 8.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+8",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+8+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "9",
      title: "Product 9",
      price: 9.0,
      description: "Description for Product 9.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+9",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+9+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "10",
      title: "Product 10",
      price: 9.5,
      description: "Description for Product 10.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+10",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+10+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "11",
      title: "Product 11",
      price: 10.0,
      description: "Description for Product 11.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+11",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+11+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "12",
      title: "Product 12",
      price: 10.5,
      description: "Description for Product 12.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+12",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+12+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "13",
      title: "Product 13",
      price: 11.0,
      description: "Description for Product 13.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+13",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+13+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "14",
      title: "Product 14",
      price: 11.5,
      description: "Description for Product 14.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+14",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+14+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "15",
      title: "Product 15",
      price: 12.0,
      description: "Description for Product 15.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+15",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+15+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "16",
      title: "Product 16",
      price: 12.5,
      description: "Description for Product 16.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+16",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+16+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "17",
      title: "Product 17",
      price: 13.0,
      description: "Description for Product 17.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+17",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+17+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "18",
      title: "Product 18",
      price: 13.5,
      description: "Description for Product 18.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+18",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+18+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "19",
      title: "Product 19",
      price: 14.0,
      description: "Description for Product 19.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+19",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+19+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "20",
      title: "Product 20",
      price: 14.5,
      description: "Description for Product 20.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+20",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+20+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "21",
      title: "Product 21",
      price: 15.0,
      description: "Description for Product 21.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+21",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+21+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "22",
      title: "Product 22",
      price: 15.5,
      description: "Description for Product 22.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+22",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+22+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "23",
      title: "Product 23",
      price: 16.0,
      description: "Description for Product 23.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+23",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+23+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "24",
      title: "Product 24",
      price: 16.5,
      description: "Description for Product 24.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+24",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+24+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
    {
      id: "25",
      title: "Product 25",
      price: 17.0,
      description: "Description for Product 25.",
      images: {
        primary: "https://via.placeholder.com/800x1000?text=Product+25",
        gallery: [
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+1",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+2",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+3",
          "https://via.placeholder.com/200x200?text=Product+25+Gallery+4",
        ],
      },
      availableSizes: [],
      defaultQuantity: 1,
    },
  ]);

  const [selctedProduct, setSelctedProduct] = useState({
    id: "1",
    title: "Product 1",
    price: 5.0,
    description: "Description for Product 1.",
    images: {
      primary: "https://via.placeholder.com/800x1000?text=Product+1",
      gallery: [
        "https://via.placeholder.com/200x200?text=Product+1+Gallery+1",
        "https://via.placeholder.com/200x200?text=Product+1+Gallery+2",
        "https://via.placeholder.com/200x200?text=Product+1+Gallery+3",
        "https://via.placeholder.com/200x200?text=Product+1+Gallery+4",
      ],
    },
    availableSizes: [],
    defaultQuantity: 1,
  });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Get the current cart from localStorage (or use an empty array)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if the product is already in the cart
    const existingIndex = cart.findIndex(
      (item) => item.id === selctedProduct.id
    );
    if (existingIndex >= 0) {
      // Update the quantity if product exists
      cart[existingIndex].quantity += quantity;
    } else {
      // Add product with the current quantity
      cart.push({ ...selctedProduct, quantity });
    }
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Product added to cart!");
  };

  // const handleBuyNow = () => {
  //   // Add product to cart
  //   handleAddToCart();
  //   // Then navigate to checkout page
  //   navigate("/checkout");
  // };
  useEffect(() => {
    // Find the product with the matching id
    const foundProduct = products.find((item) => item.id === id);
    if (foundProduct) {
      setSelctedProduct(foundProduct);
    }
  }, [id]);

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-4">
            <img
              src={selctedProduct.images.primary}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {selctedProduct.images.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product view ${index}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-serif mb-4">{selctedProduct.title}</h1>
          <p className="text-2xl text-gold mb-6">{selctedProduct.price}</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-lg mb-2">Description</h3>
              <p className="text-gray-600">{selctedProduct.description}</p>
            </div>

            {/* Size Selection */}
            {/* <div>
              <h3 className="font-serif text-lg mb-2">Select Size</h3>
              <div className="flex gap-4">
                {["38R", "40R", "42R", "44R", "46R"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "border-gold bg-gold text-white"
                        : "border-gray-300 hover:border-gold"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

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
              <button
                className="btn btn-gold w-full py-3"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              {/* <button
                className="btn btn-primary w-full py-3"
                onClick={handleBuyNow}
              >
                Buy Now
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
