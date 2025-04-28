import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../apis/authentication";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("success:", values);
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values);
      dispatch(HideLoading())
      console.log(response);  // Log API response for debugging

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";  // Show success message
      } else {
        message.error(response.message);  // Show error message
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);  // Show error message
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary ">
      <div className="bg-white p-4 w-400">
        <h4>JobQuest - LOGIN</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button className="primary-contained-btn w-100 mt-2" type="submit">
            Login
          </button>
          <Link to="/register" className="d-block  mb-4 mt-2">
            Not a member?Click Here to Register
          </Link>
        </Form>
      </div>
    </div>
  );
};
export default Login;
