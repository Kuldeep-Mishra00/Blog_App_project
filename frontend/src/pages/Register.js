import React from "react";
import '../App.css'
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/singup", values);
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="container form">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="form-signin"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="w-100 btn bttn btn-primary" type="submit">
            Register
          </button>
          <p className='my-2'>OR</p>
          <Link to="/login" className="btn w-100 btn-light changebtn">
            Already user login here
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
