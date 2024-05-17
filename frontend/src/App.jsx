import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Product from "./pages/Products/Product";
import Edit from "./pages/Products/Edit";
import Create from "./pages/Products/Create";
import View from "./pages/Products/View";

const App = () => {
  const routes = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Product /> },
        { path: "/product", element: <Create /> },
        { path: "/product/:id", element: <View /> },
        { path: "/product/:id/edit", element: <Edit /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
