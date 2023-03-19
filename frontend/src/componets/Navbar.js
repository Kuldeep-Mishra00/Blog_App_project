import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [show, setshow] = useState()
    const navigate= useNavigate()

    useEffect(() => {
        const istoken = localStorage.getItem('token');
        istoken ? setshow(true) : setshow(false);
    }, [])

    const Logout= ()=>{
        localStorage.clear();
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Master Blog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nv-link" aria-current="page" to="/">Latest blog</Link>
                            </li>
                            {show ?
                                <>
                                    <li className="nav-item r1">
                                        <Link className="nv-link" to="/createpost">Create a New Blog</Link>
                                    </li>
                                    <li className="nav-item r0">
                                        <Link className="nv-link" onClick={Logout}>Log Out</Link>
                                    </li>
                                </>
                                : <>
                                    <li className="nav-item r1">
                                        <Link className="nv-link" to="/login">Log-in</Link>
                                    </li>
                                    <li className="nav-item r0">
                                        <Link className="nv-link" to="/registation">registration</Link>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
