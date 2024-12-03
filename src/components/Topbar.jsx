import React, { useEffect, useState } from "react";
import defaultProfile from "../assets/images/default-profile.png";
import addImg from "../assets/images/add-image.png";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();
    const [currentUrl, setCurrentUrl] = useState();

    const toAddItem = () => {
        navigate("/add-item");
    };
    const toMain = () => {
        navigate("/");
    };
    const location = useLocation();

    useEffect(() => {
        const urlString = location.pathname.substring(1);
        if (urlString === "") setCurrentUrl("main");
        else setCurrentUrl(urlString);
    }, [navigate]);

    return (
        <div className="topbar">
            <div className="btn-wrap">
                <img src={defaultProfile} alt="profile" onClick={toMain} />
                <div className={currentUrl === "main" ? `hidden` : `visible`}>
                    ㅁㅇㅇ item
                </div>
                <img
                    src={addImg}
                    alt="add icon"
                    onClick={toAddItem}
                    className={currentUrl === "add-item" ? `hidden` : `visible`}
                />
            </div>
        </div>
    );
};

export default Topbar;
