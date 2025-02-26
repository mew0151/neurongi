import React from "react";
import { useNavigate } from "react-router-dom";
import addItem from "../assets/images/icon/add-item.png";

function ItemManager() {
    const navigate = useNavigate();
    const gotoAdditem = () => {
        navigate("/add-item");
    };

    return (
        <div className="item-manager">
            <div className="item-manager-content">
                <div className="item-poket">@all items</div>
                <img
                    src={addItem}
                    onClick={gotoAdditem}
                    className="add-button"
                    alt="add item"
                />
            </div>
            <div className="item-manager-height"></div>
        </div>
    );
}

export default ItemManager;
