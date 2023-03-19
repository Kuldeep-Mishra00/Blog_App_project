import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SingleCom = (post) => {
    const [user,setuser]=useState()
    const FetchUser = async () => {
        const users = await axios.get(`http://localhost:5000/user${post.userid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
        setuser(users.data)
    }
    useEffect(() => {
        FetchUser()
    }, [])
    return (
        <>
            <div className="container">
                <img src={post.picture ? post.picture : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"} className="single-img" alt="..." />
            </div>

            <div className="container">
                <h1 className='single-heading'>{post.title}</h1>
                <p className='time-author'>{post.createdDate}  {user.name}</p>
                <p className='get-discrip'>{post.discription}</p>
            </div>
        </>
    )
}

export default SingleCom