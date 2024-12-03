import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";

import submitImg from "../assets/images/submitimg.png";

const AddItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    var today = new Date();

    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);

    var dateString = year + "-" + month + "-" + day;

    const [itemForm, setItemForm] = useState({
        id: 0,
        name: "",
        qty: "",
        emogi: "",
        date: dateString,
        folder: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setItemForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            ...itemForm,
            id: Date.now(),
            folder: "all",
            date: new Date(itemForm.date).getTime()
        };
        dispatch(addItem(newItem));
        alert("추가햇다뽀용 ​( σ̴̶̷̤ .̫ σ̴̶̷̤ ♡");
        navigate("/");
    };

    return (
        <div className="add-item">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="emogi"
                    tabIndex="1"
                    value={itemForm.emogi}
                    onChange={handleInputChange}
                    placeholder="아이콘"
                    className="input"
                />
                <input
                    type="text"
                    name="name"
                    tabIndex="2"
                    value={itemForm.name}
                    onChange={handleInputChange}
                    placeholder="이름"
                    className="input"
                />
                <input
                    type="number"
                    name="qty"
                    value={itemForm.qty}
                    onChange={handleInputChange}
                    tabIndex="3"
                    pattern="[0-9]*"
                    inputMode="decimal"
                    placeholder="수량"
                    className="input"
                    // onKeyDown={test}
                />
                <input
                    type="date"
                    name="date"
                    value={itemForm.date}
                    onChange={handleInputChange}
                    tabIndex="4"
                    placeholder="날짜"
                    className="input"
                    // onKeyDown={test}
                />
                <div className="submitBtn">
                    <img src={submitImg} alt="추가하기 이미지" />
                    <input
                        type="submit"
                        value="추가하기"
                        alt="아이템 추가하기"
                        className="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddItem;
