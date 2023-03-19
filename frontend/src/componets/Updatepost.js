import React, { useEffect, useState } from 'react'
import { Form, Input, message } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

const initialPost = {
    title: '',
    summary: '',
    discription: '',
    picture: '',
    userid: '',
    createdDate: new Date()
}

const Updatepost = () => {
    const navigate = useNavigate();
    const [isuser, setisuser] = useState()
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { id } = useParams();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    // checking AUTH
    const CheckAUth = async () => {
        const isAuth = localStorage.getItem('id')
        if (isAuth) {
            setisuser(true);
        } else {
            setisuser(false);
            navigate('/');
        }
    }

    const FetchPost = async () => {
        const fdata = await axios.get(`http://localhost:5000/post/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
        if (fdata) {
            console.log(fdata.data)
            setPost(fdata.data)
        }
    }

    useEffect(() => {
        CheckAUth()
        FetchPost();
    }, [])



    const uploaddata = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/update/${id}`, post,
                {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                      }
                });
            if (res.data.success) {
                message.success("post update successfully");
                navigate(`/post/${id}`);
            } else {
                message.error(res.data.msg);
            }
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong in creating post");
        }
    }


    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                console.log(data)
                const response = await axios.post("http://localhost:5000/file/upload", data);
                post.picture = response.data;
            }
        }
        getImage();
        post.userid = localStorage.getItem('id');
    }, [file])



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="container post ">
                <Form
                    layout="vertical"
                    onFinish={uploaddata}
                    className="form-signin"
                >
                    <h3 className="text-center heading">
                        Update Post
                    </h3>
                    <img className='post-img' src={url} alt="" />
                    <Form.Item label="title" >
                        <Input name="title" type="text" required value={post.title} onChange={(e) => handleChange(e)}/>
                    </Form.Item>
                    <Form.Item label="summary" >
                        <Input name="summary" type="text" required value={post.summary} onChange={(e) => handleChange(e)}/>
                    </Form.Item>
                    <Form.Item label="discription" >
                        <TextArea name="discription" rows={4} required value={post.discription} onChange={(e) => handleChange(e)}/>
                    </Form.Item>

                    <div className="mb-3 txt-strt">
                        <label htmlFor="formFileSm" >Image</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" name='post-img' onChange={ev => setFile(ev.target.files[0])} />
                    </div>

                    <button className="w-100 btn bttn">
                        Update Post
                    </button>
                </Form>


            </div>
        </>
    )
}

export default Updatepost