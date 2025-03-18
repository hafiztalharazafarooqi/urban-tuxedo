import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";

const uploadImage = async (file) => {
  if (!file) return null;

  const apiKey = '87b38229ce97791b612d8ccae0d12b16'; // Replace with your ImgBB API key

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.success ? data.data.url : null;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
    isActive: true,
    parentCategory: "",
    comingSoon: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const imageFileInputRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox inputs differently than text inputs
    const newValue = type === 'checkbox' ? checked : value;
    
    setCategoryData({
      ...categoryData,
      [name]: newValue,
      // Only generate slug when name changes and it's not a checkbox
      slug: name === "name" ? generateSlug(value) : categoryData.slug,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setCategoryData({
      ...categoryData,
      image: file,
    });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage(categoryData.image);
      const formattedData = {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        image: imageUrl,
        isActive: categoryData.isActive,
        parentCategory: categoryData.parentCategory || null,
        comingSoon: categoryData.comingSoon,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${BACKEND_URL}/category/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      onAddCategory(data);
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const formattedCategory = data.category.map((category) => ({
        id: category._id, // _id is already a string in actual API response
        name: category.name,
        slug: category.slug,
      }));
      setCategoryList(formattedCategory);
    } catch (error) {
      console.warn(`Failed to fetch category: ${error.message}`);
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
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={categoryData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Category
                </label>
                <select
                  name="parentCategory"
                  value={categoryData.parentCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">None</option>
                  {categoryList.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Select a parent category to create a subcategory
                </p>
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
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="comingSoon"
                  name="comingSoon"
                  checked={categoryData.comingSoon}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                />
                <label htmlFor="comingSoon" className="text-sm font-medium text-gray-700">
                  Mark as &quot;Coming Soon&quot;
                </label>
              </div>
            </div>
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
                        alt="Preview"
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
              
              {categoryData.parentCategory && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600">
                    This will be created as a subcategory under &quot;{categoryData.parentCategory}&quot;
                    <strong>
                      {categoryList.find(cat => cat._id === categoryData.parentCategory)?.name || ""}
                    </strong>
                  </p>
                </div>
              )}
              
              {categoryData.comingSoon && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    This category will be marked as &quot;Coming Soon&quot;.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => onAddCategory(false)}
              className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 transition"
            >
              Cancel
            </button>
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