import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

const uploadImage = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/${file?.name}`);
    }, 1000);
  });
};

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
    isActive: true,
    parentCategory: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
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
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
        isActive: true,
        parentCategory: null,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        "https://urban-tuxedo-backend.vercel.app/api/category/",
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
      onAddCategory(data);
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
          <button onClick={() => onAddCategory(false)} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Title*</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="mt-1 flex items-center">
                <input type="file" ref={imageFileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                <button
                  type="button"
                  onClick={() => imageFileInputRef.current.click()}
                  className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 px-6 py-4 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                >
                  {imagePreview ? (
                    <div className="w-full">
                      <img src={imagePreview} alt="Preview" className="h-40 mx-auto object-contain rounded-md" />
                      <p className="mt-2 text-center text-xs">Click to change image</p>
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