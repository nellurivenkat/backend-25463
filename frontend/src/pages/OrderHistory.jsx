import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin } from "antd";

import { useNavigate } from "react-router-dom";
import { fetchUsersOrder } from "../functions/Product";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const productsData = await fetchUsersOrder();
        console.log(productsData)
        setOrders(productsData);
      } catch (error) {
        console.log(error)
        setError("Error fetching Orders");
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, []);
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-3xl font-bold mb-4">User Order History</h1>
      <div>This is the list of product you orderd.</div>
      {orders.length > 0 &&
        orders.map((item, i) => (
          <Table
            columns={columns}
            dataSource={item?.products}
            rowKey="_id"
            key={i}
          />
        ))}
    </div>
  );
};

export default OrderHistory;
