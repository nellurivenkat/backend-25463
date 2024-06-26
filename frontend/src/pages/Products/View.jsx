import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../functions/Product";
import { useNavigate } from "react-router-dom";


const View = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="pt-10">
      <div className="container mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-3xl font-bold mb-3 capitalize">
            {product.title}
          </h1>
          <p className="text-gray-700 mb-4">
            <b>Description:</b> {product.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 text-lg p-2 rounded border border-gray-200">
            <p className="mb-2">
              <b>Price:</b> ${product.price}
            </p>
            <p className="mb-2">
              <b>Discount Percentage:</b> {product.discountPercentage}%
            </p>
            <p className="mb-2">
              <b>Rating:</b> {product.rating}
            </p>
            <p className="mb-2">
              <b>Stock:</b> {product.stock}
            </p>
            <p className="mb-2">
              <b>Brand:</b> {product.brand}
            </p>
            <p className="mb-2">
              <b>Category:</b> {product.category}
            </p>
            <div className="flex gap-3 items-center">
              <button
                type="primary"
                className="mr-2 border p-1 px-4 rounded text-white bg-blue-500"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View
              </button>
              <button
                type="default"
                className="mr-2 border p-1 px-4 rounded text-white bg-green-500"
                onClick={() => navigate(`/product/${product._id}/edit`)}
              >
                Edit
              </button>
              <button
                type="danger"
                className="mr-2 border p-1 px-4 rounded text-white bg-red-500"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <div className="flex flex-wrap gap-3">
              {product?.images &&
                product.images.map((item, i) => (
                  <div key={i} className="w-32 h-32">
                    <img
                      src={item}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
