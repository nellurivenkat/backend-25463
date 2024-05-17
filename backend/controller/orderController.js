const express = require("express");
const Order = require("../models/orderModel");
const Item = require("../models/item");

// Create a new order
const placeOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const user = req.user;
    const newOrder = new Order({
      products,
      userId: user._id,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
};

// Fetch all orders
const getUserOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId: userId })
      .populate({
        path: "products",
        select: "title price description price thumbnail category brand",
        match: { _id: { $type: "objectId" } },
      })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    // console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
};

// Fetch a specific order by ID
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.status(200).json({order});
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Error fetching order");
  }
};

// Update an order by ID
const updatedOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrderData = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updatedOrderData,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Error updating order");
  }
};

module.exports = { placeOrder, getUserOrder, getOrder, updatedOrder };
