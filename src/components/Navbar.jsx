import React from 'react';
import '../styles/Navbar.css';
// import infinityGif from '../images/infinity-gif.gif';
import { ImPencil2 } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { ImUser } from "react-icons/im";
import { HiHome } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import {  NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const currentUser = useContext(AuthContext);

    return (
        <>
            <nav className='d-flex navbar'>
                <div className="d-flex left-container">

                    <div className="ham-burger" onClick={e => setOpenNav(!openNav)}>
                        {
                            openNav ? <RiCloseFill className='icon' /> : <RiMenu2Line className='icon' />
                        }
                    </div>

                    <span className='logo-name'><NavLink to="/">Blogs</NavLink></span>
                    {/* <img src={infinityGif} alt="" className='logo-img' /> */}
                </div>

                <div className={`mid-container ${openNav ? 'open' : ''}`}  onClick={e => setOpenNav(!openNav)}>
                    <ul className="d-flex menu">

                        <NavLink className="d-flex menu-item" to="/" end onClick={e => setOpenNav(!openNav)}>
                            <HiHome className='icon' />
                            <span className='icon-title'>Home</span>
                        </NavLink>

                        <NavLink className="d-flex menu-item" to="/create-blog" onClick={e => setOpenNav(!openNav)}>
                            <ImPencil2 className='icon' />
                            <span className='icon-title'>Create Blog</span>
                        </NavLink>
                        
                        <NavLink className="d-flex menu-item" to="/search" onClick={e => setOpenNav(!openNav)}>
                            <ImSearch className='icon' />
                            <span className='icon-title'>Search user</span>
                        </NavLink>
                        
                        <NavLink className="d-flex menu-item" to={`/profile/${currentUser.uid}`} onClick={e => setOpenNav(!openNav)}>
                            <ImUser className='icon' />
                            <span className='icon-title'>My profile</span>
                        </NavLink>
                    </ul>
                </div>

                <div className="d-flex user-info">
                    <img src={currentUser.photoURL} alt="profile-img" className='user-img' onClick={e => window.open(e.target.src, '_blank') } onError={e => {e.target.src = "https://cdn-icons-png.flaticon.com/512/4333/4333609.png"}} />

                    <NavLink className='user-name' to={`/profile/${currentUser.uid}`} >{currentUser.displayName}</NavLink>
                    <button className='logout-btn' onClick={() => signOut(auth)} >Logout</button>
                </div>

            </nav>
        </>
    )
}

export default Navbar