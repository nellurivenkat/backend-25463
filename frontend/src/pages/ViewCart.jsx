import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem } from "../functions/redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { createOrder } from "../functions/Product";

const ViewCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const [message, setmessage] = useState(null)
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };
  const Order = async () => {
    const orderData = {
      products: items,
    };
    try {
      setLoading(true);
      setError(null);
      await createOrder(orderData);
      dispatch(clearCart())
      setmessage("Your order has been placed successfully!")
    } catch (error) {
      setError("An error sending order.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <div className="">
          These are the list of your carts. You can remove the unwanted goods
        </div>
        {message && <div className="text-green-400">{message}</div>}
             
        <div className="w-[400px]">
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="mb-4 flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p>${item.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
             {error && <div className="text-red-400">{error}</div>}
              <button
                onClick={Order}
                disabled={loading}
                className="bg-blue-500 px-5 py-2 w-[200px] text-white rounded"
              >
                {loading ? "Loading..." : "Order"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
