import React from 'react'
import './navbar.css'
import logo from '../../assets/tick-logo.png'
import "@fortawesome/fontawesome-free/css/all.min.css";


const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <ul>
                    <li>Events</li>
                    <li>My Tickets</li>
                    <li>About Project</li>
                </ul>

                <button>My Tickets <i className="fa-solid fa-arrow-right"></i></button>
            </nav>
        </div>
    )
}

export default Navbar
