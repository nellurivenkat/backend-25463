import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Product from "./pages/Products/Product";
import Edit from "./pages/Products/Edit";
import Create from "./pages/Products/Create";
import View from "./pages/Products/View";
import Welcome from "./pages/Welcome";
import ViewProductDetails from "./pages/ViewItem";
import ViewCart from "./pages/ViewCart";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import OrderHistory from "./pages/OrderHistory";

const Public = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      if (isAuthenticated) {
        navigate("/orderHistory");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return "Loading...";

  // Show outlet if authenticated, otherwise redirect to login
  return !isAuthenticated ? <Outlet /> : null;
};

const Private = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      if (!isAuthenticated) {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return "Loading....";

  // Show outlet if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : null;
};

const IsAdmin = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (currentUser === null) {
        setLoading(true);
        return;
      }

      if (currentUser?.userType !== "admin") {
        navigate("/");
      }
      setLoading(false);
    };

    checkAuthorization();
  }, [currentUser, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return "Loading....";

  // Show outlet if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : null;
};
const App = () => {
  const routes = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <Private />,
          children: [
            { path: "product", element: <Product /> },
            { path: "/product/create", element: <Create /> },
            { path: "/product/:id", element: <View /> },
            { path: "/product/:id/edit", element: <Edit /> },
            {
              path: "/viewCart",
              element: <ViewCart />,
            },
            {
              path: "/orderHistory",
              element: <OrderHistory />,
            },
          ],
        },

        {
          element: <Public />,
          children: [
            {
              path: "/register",
              element: <Register />,
            },
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
        {
          path: "/",
          element: <Welcome />,
        },
        { path: "/item/:id", element: <ViewProductDetails /> },
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
