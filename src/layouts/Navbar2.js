import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Navbar2 = () => {
    const router = useRouter()
    const [token,setToken] = useState(null);

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const tok = localStorage.getItem('token')
            setToken(tok)
          }
    },[token])

    const handleLogout = () =>{
        router.push('/landing')
        localStorage.removeItem('token','')
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark  top-header">
        <a className="navbar-brand" href="/">
            <img src="/images/logo-right.jpg" alt="" style={{height:'30px',width:'30px'}}/></a>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
            <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
        </button>
        <div className={`collapse navbar-collapse d-lg-flex justify-content-md-end ${isOpen ? 'show' : 'not-show'}`}>
            <ul className="navbar-nav">
                <li className="nav-item active py-lg-0 py-3">
                    <a href="/">Home</a>
                </li>
                <li className="nav-item py-lg-0 py-3">
                    <a href="/faq">FAQ</a>
                </li>
                <li className="nav-item py-lg-0 py-3">
                    <a href="/policy">Policy</a>
                </li>
                <li className="nav-item py-lg-0 py-3">
                    <a href="/terms">Terms</a>
                </li>
               
         
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar2
