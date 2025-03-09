import { useRef, useState } from "react";
import { FiPlus, FiUpload, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

// Mock function to simulate image upload
const uploadImage = async (file) => {
  // Replace this with your actual image upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/${file.name}`);
    }, 1000);
  });
};

const AddProductForm = ({ onAddProduct }) => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    categories: "",
    images: {
      primary: null,
      gallery: [],
    },
    availableSizes: [],
    defaultQuantity: 1,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [primaryImagePreview, setPrimaryImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setProductData({
        ...productData,
        availableSizes: [...productData.availableSizes, sizeInput.trim()],
      });
      setSizeInput("");
    }
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...productData.availableSizes];
    updatedSizes.splice(index, 1);
    setProductData({
      ...productData,
      availableSizes: updatedSizes,
    });
  };

  const handlePrimaryImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPrimaryImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file in state
    setProductData({
      ...productData,
      images: {
        ...productData.images,
        primary: file,
      },
    });
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create previews
    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setGalleryPreviews((prevPreviews) => [
            ...prevPreviews,
            ...newPreviews,
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Store the files in state
    setProductData({
      ...productData,
      images: {
        ...productData.images,
        gallery: [...productData.images.gallery, ...files],
      },
    });
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = [...productData.images.gallery];
    updatedGallery.splice(index, 1);

    const updatedPreviews = [...galleryPreviews];
    updatedPreviews.splice(index, 1);

    setProductData({
      ...productData,
      images: {
        ...productData.images,
        gallery: updatedGallery,
      },
    });
    setGalleryPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload primary image
      const primaryImageUrl = await uploadImage(productData.images.primary);

      // Upload gallery images
      const galleryImageUrls = await Promise.all(
        productData.images.gallery.map((file) => uploadImage(file))
      );

      // Format data for API
      const formattedData = {
        ...productData,
        price: parseFloat(productData.price),
        isFeatured: false,
        defaultQuantity: parseInt(productData.defaultQuantity) || 1,
        __v: 0,
        images: {
          primary: primaryImageUrl,
          gallery: galleryImageUrls,
        },
      };

      // Send data to API
      const response = await fetch(
        "https://urban-tuxedo-backend.vercel.app/api/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      onAddProduct(data); // Notify parent component
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Add New Product</h2>
          <button
            onClick={() => onAddProduct(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price* ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories (separated by &apos;/&apos;)
                </label>
                <input
                  type="text"
                  name="categories"
                  value={productData.categories}
                  onChange={handleChange}
                  placeholder="e.g. Accessories/Formal Wear"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Quantity
                </label>
                <input
                  type="number"
                  name="defaultQuantity"
                  value={productData.defaultQuantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Sizes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="e.g. 38R, 40R"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="btn bg-gray-800 text-white px-3 py-2 rounded-md"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {productData.availableSizes.map((size, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-1"
                    >
                      <span>{size}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    ref={primaryFileInputRef}
                    onChange={handlePrimaryImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => primaryFileInputRef.current.click()}
                    className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 px-6 py-4 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    {primaryImagePreview ? (
                      <div className="w-full">
                        <img
                          src={primaryImagePreview}
                          alt="Primary preview"
                          className="h-40 mx-auto object-contain rounded-md"
                        />
                        <p className="mt-2 text-center text-xs">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FiUpload className="mx-auto h-8 w-8" />
                        <p className="mt-1">Upload primary product image</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Gallery Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Images
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    ref={galleryFileInputRef}
                    onChange={handleGalleryImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current.click()}
                    className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 px-6 py-4 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    <div className="text-center">
                      <FiUpload className="mx-auto h-8 w-8" />
                      <p className="mt-1">Upload additional product images</p>
                    </div>
                  </button>
                </div>

                {/* Gallery previews */}
                {galleryPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Gallery ${index}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default AddProductForm;
