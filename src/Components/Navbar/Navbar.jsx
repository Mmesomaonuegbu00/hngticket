import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/tick-logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <li onClick={() => navigate("/")}>Events</li>
                    <li onClick={() => navigate("/tickets")}>My Tickets</li>
                    <li onClick={() => navigate("/about")}>About Project</li>
                </ul>
                <button onClick={() => navigate("/tickets")}>
                    My Tickets <i className="fa-solid fa-arrow-right"></i>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
