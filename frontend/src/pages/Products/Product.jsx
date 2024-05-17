import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin } from "antd";
import { getAllProducts, deleteProduct } from "../../functions/Product";
import { useNavigate } from "react-router-dom";

const Product = () => {
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

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
      message.success("Product deleted successfully");
    } catch (error) {
      setError("Error deleting product");
      message.error("Error deleting product");
    }
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <img
          src={record.thumbnail}
          alt={record.title}
          className="w-16 h-16 object-cover"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="mr-2"
            onClick={() => navigate(`/product/${record._id}`)}
          >
            View
          </Button>
          <Button
            type="default"
            className="mr-2"
            onClick={() => navigate(`/product/${record._id}/edit`)}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div>This is the list of all the registered products</div>
      <Table columns={columns} dataSource={products} rowKey="_id" />
    </div>
  );
};

export default Product;
