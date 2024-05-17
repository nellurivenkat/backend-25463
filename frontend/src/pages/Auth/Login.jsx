import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { login } from "../../functions/Product";
import { setUser } from "../../functions/auth/authSlice";

const initialValues = {
  email: "",

  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    // Handle form submission here

    try {
      setError(null);
      setLoading(true);
      const res = await login(formData);

      dispatch(setUser(res.user));
      const userInfo = JSON.stringify(res.user);
      Cookies.set("currentUser", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      Cookies.set("token", res.token);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="w-[50%] bg-pink-600"></div>
      <div className="w-[50%] py-20 flex items-center justify-center flex-col bg-white ">
        <div className="w-[600px] rounded-xl border p-10 bg-white ">
          <div className="text-[25px]">Login</div>
          <div className="mb-5 text-zinc-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis,
            laudantium.
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <div className="mb-3">
                  <Field
                    className="w-[100%] p-2 rounded border "
                    name="email"
                    type="email"
                  />
                  <ErrorMessage
                    className="text-[11px] text-red-600"
                    name="email"
                    component="div"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="mb-3">
                  <Field
                    className="w-[100%] p-2 rounded border "
                    name="password"
                    type="password"
                  />
                  <ErrorMessage
                    className="text-[11px] text-red-600"
                    name="password"
                    component="div"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-[13px]">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-pink-700 text-white rounded"
              >
                {loading ? "Loading.." : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
