import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Function to upload a new product
export const uploadProduct = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Function to get a single product by ID
export const getProductById = async (productId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a product by ID
export const updateProduct = async (productId, formData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
