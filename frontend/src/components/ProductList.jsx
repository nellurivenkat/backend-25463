import React, { useEffect, useState } from "react";
import ProductView from "./Ui/ProductView";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../functions/Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  return (
    <div className="container mx-auto">
      <div className="text-[24px] font-bold text-pink-600">Product title</div>
      <p className="text-[13px] text-zinc-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, itaque?
      </p>
      <div className="grid grid-cols-4 mt-5 gap-5">
        {products.length > 0 &&
          products.map((item, i) => <ProductView product={item} key={i} />)}
      </div>
    </div>
  );
};

export default ProductList;
