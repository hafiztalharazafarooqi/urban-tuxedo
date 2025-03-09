import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

// Mock function to simulate image upload
const uploadImage = async (file) => {
  // Replace this with your actual image upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/${file.name}`);
    }, 1000);
  });
};

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file in state
    setCategoryData({
      ...categoryData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload primary image
      const imageUrl = await uploadImage(categoryData.image);

      // Format data for API
      const formattedData = {
        ...categoryData,
        __v: 0,
        image: imageUrl,
      };

      // Send data to API
      const response = await fetch(
        "https://urban-tuxedo-backend.vercel.app/api/categorys/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();

      onAddCategory(data); // Notify parent component
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Add New Category</h2>
          <button
            onClick={() => onAddCategory(false)}
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
                  Category Title*
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={categoryData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
            </div>

            {/*  Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  ref={imageFileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageFileInputRef.current.click()}
                  className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 px-6 py-4 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                >
                  {imagePreview ? (
                    <div className="w-full">
                      <img
                        src={imagePreview}
                        alt=" preview"
                        className="h-40 mx-auto object-contain rounded-md"
                      />
                      <p className="mt-2 text-center text-xs">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FiUpload className="mx-auto h-8 w-8" />
                      <p className="mt-1">Upload category image</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddCategoryForm.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
};

export default AddCategoryForm;
