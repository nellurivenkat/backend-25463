import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../functions/Product";
import { Form, Input, Button, message } from "antd";

const Edit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        form.setFieldsValue(productData);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await updateProduct(id, values);
      message.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      message.error("Error updating product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen ">
      <div className="container mx-auto p-4">
        <div className="text-[20px] font-bold">Edit Post</div>
        <div className="text-gray-500">Fill in the new product details.</div>
        <div className="flex items-center justify-center">
          <div className="w-[50%]">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="w-[50%]">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
