import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Singlepost = () => {
    const [posts, setposts] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    const FetchPost = async () => {
        const Post = await axios.get(`http://localhost:5000/post/${id}`);
        if (Post) {
            console.log(Post.data)
            setposts(Post.data)
        }
    }

    const deletepost = async()=>{
        const Post = await axios.delete(`http://localhost:5000/delete/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
        if(Post){
            message.success('Post Deleted');
            navigate('/')
        }
    }
    

    const userid = localStorage.getItem('id');

    useEffect(() => {
        FetchPost();
    }, [])

    return (

        <>
            {/* {
            posts.userid===userid?
        } */}

            {
                userid === posts.userid?
                <div className="button-group">
                    <Link to={`/update/${posts._id}`} className="btn btn-shadow bttn mr">
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button className="btn btn-shadow ml" onClick={deletepost}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
                :
                <></>
            }
            

            <div className="container">
                <img src={posts.picture ? posts.picture : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"} className="single-img" alt="..." />
            </div>

            <div className="container">
                <h1 className='single-heading'>{posts.title}</h1>
                <p className='time-author'>{new Date(posts.createdDate).toDateString()} </p>
                <p className='get-discrip'>{posts.discription}</p>
            </div>
        </>
    )
}

export default Singlepost