import React from 'react'
import { Link } from 'react-router-dom'

const TopBlog = ({post}) => {
    return (
        <>
            <div className='blog-box' key={post._id}>
                <div className='blog-details'>
                    <Link to={`/post/${post._id}`} className='top-title'>{post.title}</Link>
                    <p>{post.summary}</p>
                </div>
            </div>
        </>
    )
}

export default TopBlog