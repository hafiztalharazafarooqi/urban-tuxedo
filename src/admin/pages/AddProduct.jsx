import { useRef, useState } from 'react';
import { FiPlus, FiUpload, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

const AddProductForm = ({ onAddProduct }) => {
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    categories: '',
    images: {
      primary: null,
      gallery: []
    },
    availableSizes: [],
    defaultQuantity: 1
  });
  
  const [sizeInput, setSizeInput] = useState('');
  const [primaryImagePreview, setPrimaryImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  
  const primaryFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setProductData({
        ...productData,
        availableSizes: [...productData.availableSizes, sizeInput.trim()]
      });
      setSizeInput('');
    }
  };
  
  const handleRemoveSize = (index) => {
    const updatedSizes = [...productData.availableSizes];
    updatedSizes.splice(index, 1);
    setProductData({
      ...productData,
      availableSizes: updatedSizes
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
        primary: file
      }
    });
  };
  
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Create previews
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setGalleryPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Store the files in state
    setProductData({
      ...productData,
      images: {
        ...productData.images,
        gallery: [...productData.images.gallery, ...files]
      }
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
        gallery: updatedGallery
      }
    });
    setGalleryPreviews(updatedPreviews);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format data correctly to match your payload structure
    const formattedData = {
      ...productData,
      price: parseFloat(productData.price),
      isFeatured: false,
      defaultQuantity: parseInt(productData.defaultQuantity) || 1,
      __v: 0
      // Note: You would replace the image files with URLs after upload
    };
    
    onAddProduct(formattedData);
    // setShowProductModal(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Add New Product</h2>
          <button 
            // onClick={() => setShowProductModal(false)}
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
                  Description
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md"
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
                    <div key={index} className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-1">
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
                        <p className="mt-2 text-center text-xs">Click to change image</p>
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
              type="button"
            //   onClick={() => setShowProductModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700"
            >
              Add Product
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