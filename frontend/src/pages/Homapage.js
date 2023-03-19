import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from '../componets/Slider';
import Allblogs from '../componets/Allblogs';
import TopBlog from '../componets/TopBlog';

const Homapage = () => {

  const navigate = useNavigate();
  const [isuser, setisuser] = useState()
  const [posts, setposts] = useState([])
  const CheckAUth = async () => {
    try {
      const res = await axios.post("http://localhost:5000/Auth", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      if (res.data.success) {
        localStorage.setItem(
          "id", res.data.id
        )
        setisuser(true);
      } else {
        setisuser(false);
      }
    } catch (error) {
      console.log(error)
    }
    isuser ? navigate('/') : navigate('/');
  }

  const FetchPosts = async () => {
    const Post = await axios.get("http://localhost:5000/posts");
    // console.log(Post)
    setposts(Post.data)
  }

  useEffect(() => {
    CheckAUth()
    FetchPosts()
  }, [])
  return (
    <>
      <Slider />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="blog-heading th">
              Top
            </div>
            {
              posts && posts.length > 0 ? posts.map(posts=>(
                <TopBlog post={posts} />
              )): <h1 className='blog-details'>NO REUSULT FOUND</h1>
            }
          </div>
          <div className="col-9">
            <div className="blog-heading">
              New blogs
            </div>
            {
              posts && posts.length > 0 ? posts.map(posts =>(
                <Allblogs post={posts} />
              )): <h1 className='blog-details'>NO REUSULT FOUND</h1>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Homapage