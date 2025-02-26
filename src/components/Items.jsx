import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustQty } from "../redux/itemSlice";

import qtyIcon from "../assets/images/icon/16/qty-icon.svg";
import poketIcon from "../assets/images/icon/16/poket-icon.svg";

const Item = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);

    // console.log(new Date("2024-11-05").getTime());
    console.log(items);

    const dueDateCalulate = (date) => {
        const today = new Date();
        const left = Math.round((date - today) / 86400000);
        return left >= 0 ? left + 1 : left;
    };

    const dueDateTxt = (date) => {
        if (!date) return "날짜 정보가 없어요";

        const daysLeft = dueDateCalulate(date);
        return daysLeft >= 0
            ? `${daysLeft}일 남았어요`
            : `${Math.abs(daysLeft)}일 지났어요`;
    };

    const dotStateClass = (date) => {
        const daysLeft = dueDateCalulate(date);

        if (daysLeft >= 7) return "safe";
        else if (daysLeft > 3 && daysLeft < 7) return "warning";
        else if (daysLeft >= 1 && daysLeft <= 3) return "danger";
        else return "expire";
    };

    const handleAdjustQty = (id, type, qty) => {
        dispatch(adjustQty({ id, type, qty }));
    };

    return (
        <div className="item-list">
            {items.map((item) => (
                <div key={item.id} className="item">
                    <div className="main-slot">
                        <div className="top">
                            <div className="emogi">{item.emogi}</div>
                            <div className="name">{item.name}</div>
                        </div>
                        <div className="bottom">{dueDateTxt(item.date)}</div>
                    </div>
                    <div className="detail-slot">
                        <div className="top">
                            <img src={qtyIcon} alt="qty icon" />
                            {item.qty}
                            <span className="poket-padding">
                                <img src={poketIcon} />
                                {item.poket}
                            </span>
                        </div>
                        <div className="bottom"></div>
                    </div>

                    {/* <div className="item-detail">
                            <div className="status">
                                <div
                                    className={`dot ${dotStateClass(
                                        item.date
                                    )}`}
                                >
                                </div>
                            </div>
                        <div className="qty">
                            <img
                                src={item.qty === 1 ? iconTrash : iconSubtract}
                                onClick={() => {
                                    handleAdjustQty(
                                        item.id,
                                        "decrease",
                                        item.qty
                                    );
                                }}
                            />
                            <img
                                src={iconAdd}
                                alt="add icon"
                                onClick={() => {
                                    handleAdjustQty(
                                        item.id,
                                        "increase",
                                        item.qty
                                    );
                                }}
                            />
                        </div>
                    </div> */}
                </div>
            ))}
        </div>
    );
};

export default Item;
