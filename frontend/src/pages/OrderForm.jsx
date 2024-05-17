import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../functions/Product";
import { clearCart } from "../functions/redux/cart/cartSlice";

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    deliveryState: "",
    deliveryCity: "",
    deliveryCountry: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        userId: useSelector((state) => state.auth.user._id),
        products: cartItems,
        totalPrice: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        ...formData,
      };

      await createOrder(orderData, token);
      dispatch(clearCart());
      navigate.push("/orders");
    } catch (err) {
      setError("Error creating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="w-[500px]">
        <h1 className="text-2xl font-bold mb-4">Create Order</h1>

        {error && <p className="text-red-500">{error}</p>}
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md p-3 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery State
              </label>
              <input
                type="text"
                name="deliveryState"
                value={formData.deliveryState}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md p-3 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery City
              </label>
              <input
                type="text"
                name="deliveryCity"
                value={formData.deliveryCity}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md p-3 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Country
              </label>
              <input
                type="text"
                name="deliveryCountry"
                value={formData.deliveryCountry}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md p-3 border"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md p-3 border hover:bg-blue-700"
            >
              {loading ? "Creating Order..." : "Create Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
