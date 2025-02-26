import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/images/default-profile.png";

function Header() {
    const navigate = useNavigate();
    const gotoMain = () => {
        navigate("/");
    };
    return (
        <header>
            <div className="header-content">
                <img src={profileImg} onClick={gotoMain} alt="profile img" />
            </div>

            <div className="header-height"></div>
        </header>
    );
}

export default Header;
