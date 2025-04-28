import React from "react";
import { Form, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apis/authentication";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";



function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
    
      if (response.success) {
        message.success(response.message);  // Show success message
        navigate("/login");
      } else {
        message.error(response.message);  // Show error message
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);  // Show error message
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>JobQuest - REGISTER</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!",type:"email" }
            ]}
          >
            <input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <input type="password"/>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="primary-contained-btn w-100 mt-2"
          >
            Register
          </Button>

          <Link to="/login" className="d-block mb-4 mt-2">
            Already a member? Click Here to Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
