import React from "react";
import '../App.css';
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    //form handler
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post("http://localhost:5000/login", values);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success("Login Successfully");
                navigate("/");
            } else {
                message.error(res.data.msg);
            }
        } catch (error) {
            console.log(error);
            message.error("something went wrong");
        }
    };
    return (
        <div className="container form">
            <Form
                layout="vertical"
                onFinish={onfinishHandler}
                className="form-signin"
            >
                <h3 className="text-center">Login From</h3>

                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <button className="w-100 btn bttn btn-primary" type="submit">
                    Login
                </button>
                <p className='my-2'>OR</p>
                <Link to="/registation" className="btn w-100 btn-light changebtn">
                    Already user login here
                </Link>
            </Form>
        </div>
    );
};

export default Login;
