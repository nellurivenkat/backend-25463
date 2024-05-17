import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { uploadProduct } from "../../functions/Product";


const itemSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  discountPercentage: Yup.number().min(0).max(100),
  rating: Yup.number().min(0).max(5),
  stock: Yup.number().required("Stock is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
});

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    price: "",
    discountPercentage: 0,
    rating: 0,
    stock: "",
    brand: "",
    category: "",
  };

  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      images.forEach((image) => {
        if (image) {
          formData.append("images", image);
        }
      });

     // Debugging purposes

      await uploadProduct(formData);
      setMessage("Product uploaded successfully!");
    } catch (error) {
      setError("An error occurred while uploading the product.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto pt-5">
        <div>
          <h1 className="text-3xl">Upload New Product</h1>
          <p className="text-gray-500">
            Fill the fields below to add a new product to the product list in
            the database.
          </p>
        </div>
        <div className="mt-4 w-full grid grid-cols-2 gap-4">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={itemSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {[
                    { name: "title", type: "text", label: "Title" },
                    {
                      name: "description",
                      as: "textarea",
                      label: "Description",
                    },
                    { name: "price", type: "number", label: "Price" },
                    {
                      name: "discountPercentage",
                      type: "number",
                      label: "Discount Percentage",
                    },
                    { name: "rating", type: "number", label: "Rating" },
                    { name: "stock", type: "number", label: "Stock" },
                    { name: "brand", type: "text", label: "Brand" },
                    { name: "category", type: "text", label: "Category" },
                  ].map((field, index) => (
                    <div className="mb-4" key={index}>
                      <label
                        className="block text-gray-700 text-sm font-light mb-2"
                        htmlFor={field.name}
                      >
                        {field.label}
                      </label>
                      <Field
                        name={field.name}
                        type={field.type}
                        as={field.as}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                      {loading ? "Uploading..." : "Upload Product"}
                    </button>
                  </div>
                  {error && (
                    <div className="text-red-500 text-xs italic">{error}</div>
                  )}
                  {message && (
                    <div className="text-green-500 text-xs italic">
                      {message}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="thumbnail"
              >
                Thumbnail
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnailInput"
                />
                <label htmlFor="thumbnailInput">
                  <div className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer">
                    {thumbnail ? (
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="Thumbnail Preview"
                        className="w-full h-[200px] object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        Click to upload thumbnail
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xl mb-2">Images</label>
              <div className="text-gray-500">
                Click the add image button to add more images to the uploaded
                images{" "}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {images.map((_, index) => (
                  <div key={index} className="relative mb-2 w-full">
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, index)}
                      className="hidden"
                      id={`imageInput${index}`}
                    />
                    <label htmlFor={`imageInput${index}`}>
                      <div className="appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer h-full flex items-center justify-center ">
                        {images[index] ? (
                          <img
                            src={URL.createObjectURL(images[index])}
                            alt={`Image Preview ${index}`}
                            className="w-full h-auto object-cover"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            Click to upload image {index + 1}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline h-full"
                >
                  Add More Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
