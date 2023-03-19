import React from 'react'
import { Image } from 'antd';
import { Link } from 'react-router-dom';

const Allblogs = ({post}) => {
    return (
        <>

            <div className='blog-box' key={post._id}>
                {/* <Link to={`/post?id=${post._id}`} className='top-title'> */}
                    <Image
                        width={200}
                        src={post.picture?post.picture:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                    />
                {/* </Link> */}
                <div className='blog-details'>
                <Link to={`/post/${post._id}`} className='top-title'> <h1> {post.title}</h1> </Link>
                    <p> {post.summary}</p>
                </div>
            </div>
        </>
    )
}

export default Allblogs