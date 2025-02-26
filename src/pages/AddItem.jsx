import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";

import submitImg from "../assets/images/submitimg.png";
import emptyEmogi from "../assets/images/empty-emogi.png";
import inputQtyIcon from "../assets/images/icon/input-qty-icon.svg";
import selectPoketIcon from "../assets/images/icon/select-poket-icon.svg";
import addIcon from "../assets/images/icon/16/add.svg";
import subtractIcon from "../assets/images/icon/16/subtract.svg";
import calendarImage from "../assets/images/calendar-image.png";

const AddItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [itemForm, setItemForm] = useState({
        id: 0,
        name: "",
        qty: 1,
        emogi: "",
        date: today,
        poket: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            poket: "all",
            date: new Date(itemForm.date).getTime()
        };
        dispatch(addItem(newItem));
        alert("추가햇다뽀용 ​( σ̴̶̷̤ .̫ σ̴̶̷̤ ♡");
        navigate("/");
    };

    const inputQtyImage = {
        backgroundImage: `url(${inputQtyIcon})`,
        backgroundRepeat: "no-repeat"
    };

    const selectPoketImage = {
        backgroundImage: `url(${selectPoketIcon})`,
        backgroundRepeat: "no-repeat"
    };

    const countControl = (type) => {
        if (type === "-" && itemForm.qty === 1) return;
        else {
            setItemForm((prev) => ({
                ...prev,
                qty: type === "+" ? prev.qty + 1 : prev.qty - 1
            }));
        }
    };

    // date picker - 기본 선택 정보//

    const today = new Date().toISOString().split("T")[0];
    const [year, month, day] = today.split("-");

    const [datepickerYear, setDatepickerYear] = useState(Number(year));
    const [datepickerMonth, setDatepickerMonth] = useState(Number(month));
    const [datepickerDay, setDatepickerDay] = useState(Number(day));

    const yearArr = Array.from({ length: 10 }, (_, index) => year - 1 + index);
    const monthArr = Array.from({ length: 12 }, (_, index) => index + 1);
    const [dayArr, setDayArr] = useState(
        Array.from({ length: 28 }, (_, index) => index + 1)
    );

    const updateDayGap = () => {
        const fullDate = new Date(datepickerYear, datepickerMonth, 0).getDate();
        const days = Array.from({ length: fullDate }, (_, index) => index + 1);

        // 변경 날짜가 기존보다 적을 때 처리
        if (fullDate < dayArr.length) {
            setTranslateY((prev) => {
                const updatedArr = [...prev];
                updatedArr[2] = 120 - 40 * (days.length - 1);
                return updatedArr;
            });
            setDatepickerDay(days.length);
        }

        setDayArr(days);
    };

    useEffect(() => {
        // console.log(dayArr, );
        updateDayGap();
    }, [datepickerYear, datepickerMonth]);

    // date picker - 슬라이드 선택 모달 //

    const [datepickerToggle, setDatepickerToggle] = useState(false);

    const datepickerToggleSwitch = () => {
        setDatepickerToggle((prev) => !prev);
    };

    const [startY, setStartY] = useState([0, 0, 0]);
    const [translateY, setTranslateY] = useState([120, 120, 120]);
    const [isDragging, setIsDragging] = useState([false, false, false]);

    const getClientY = (e) => {
        return e.type === "touchstart" || e.type === "touchmove"
            ? e.touches[0].clientY
            : e.clientY;
    };

    const handleDragStart = useCallback((e, index) => {
        const y = getClientY(e);
        setIsDragging((prev) => prev.map((v, i) => (i === index ? true : v)));
        setStartY((prev) => prev.map((v, i) => (i === index ? y : v)));
    }, []);

    const handleDragMove = useCallback(
        (e, index) => {
            if (!isDragging[index]) return;
            const y = getClientY(e);
            setTranslateY((prev) =>
                prev.map((v, i) =>
                    i === index ? translateY[i] + y - startY[i] : v
                )
            );
        },
        [isDragging, startY]
    );

    const handleDragEnd = useCallback(
        (e, index) => {
            console.log();
            setStartY((prev) => prev.map((v, i) => (i === index ? 0 : v)));

            setIsDragging((prev) =>
                prev.map((v, i) => (i === index ? false : v))
            );

            const lastArrLength = (index) => {
                if (index === 0) return 120 - 40 * (yearArr.length - 1);
                if (index === 1) return 120 - 40 * (monthArr.length - 1);
                if (index === 2) return 120 - 40 * (dayArr.length - 1);
            };

            if (translateY[index] <= lastArrLength(index)) {
                // 마지막 배열보다 아래로 슬라이드 시
                setTranslateY((prev) =>
                    prev.map((v, i) => (i === index ? lastArrLength(index) : v))
                );
            } else if (translateY[index] <= 120) {
                // 첫 배열보다 위로 슬라이드 시
                setTranslateY((prev) =>
                    prev.map((v, i) =>
                        i === index ? Math.round(v / 40) * 40 : v
                    )
                );
            } else {
                setTranslateY((prev) =>
                    prev.map((v, i) => (i === index ? 120 : v))
                );
            }
        },
        [translateY]
    );

    // 선택된 날짜
    useEffect(() => {
        if (!datepickerToggle) return;

        const currentYear =
            120 - yearArr.findIndex((value) => value === datepickerYear) * 40;

        const currentMonth =
            120 - monthArr.findIndex((value) => value === datepickerMonth) * 40;

        const currentDay =
            120 - dayArr.findIndex((value) => value === datepickerDay) * 40;

        const currentArr = [currentYear, currentMonth, currentDay];

        setTranslateY(currentArr);
    }, [datepickerToggle]);

    // 날짜 이동 시
    useEffect(() => {
        if (datepickerToggle === false && isDragging.every((v) => v === false))
            return;
        // console.log(new Date(datepickerYear, datepickerMonth, 0).getDate());

        setDatepickerYear(yearArr[(120 - translateY[0]) / 40]);
        setDatepickerMonth(monthArr[(120 - translateY[1]) / 40]);
        setDatepickerDay(dayArr[(120 - translateY[2]) / 40]);
        console.log("ㅇㅅㅇ");
    }, [isDragging, todayButton]);

    const todayButton = () => {
        setDatepickerYear(Number(year));
        setDatepickerMonth(Number(month));
        setDatepickerDay(Number(day));
    };

    return (
        <div className="add-item">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="emogi">
                    <img src={emptyEmogi} alt="empty emogi" />
                </div>

                <input
                    type="text"
                    name="name"
                    tabIndex="2"
                    value={itemForm.name}
                    onChange={handleInputChange}
                    placeholder="New item"
                    className="name"
                />

                <div className="category">부가 정보</div>
                <div className="qty-control">
                    <input
                        type="number"
                        name="qty"
                        value={itemForm.qty}
                        onChange={handleInputChange}
                        tabIndex="3"
                        pattern="[0-9]*"
                        inputMode="decimal"
                        className="qty"
                        style={inputQtyImage}
                    />
                    <img
                        src={subtractIcon}
                        onClick={() => countControl("-")}
                        alt="subtract icon"
                    />
                    <span className="spacing"></span>
                    <img
                        src={addIcon}
                        onClick={() => countControl("+")}
                        alt="add icon"
                    />
                </div>

                <div className="date-control">
                    <div
                        className="view-datepicker"
                        onClick={datepickerToggleSwitch}
                    >
                        <div>
                            {datepickerYear}
                            <span>년</span>
                        </div>
                        <div>
                            {datepickerMonth}
                            <span>월</span>
                        </div>
                        <div>
                            {datepickerDay}
                            <span>일</span>
                        </div>
                    </div>
                    <div className="view-calendar" onClick={todayButton}>
                        <img src={calendarImage} alt="calendar image" />
                    </div>
                </div>

                <div className="category">분류</div>

                <select name="poket" className="poket" style={selectPoketImage}>
                    <option value="">default poket</option>
                    <option value="">test</option>
                </select>
                <button className="submit-btn" onClick={handleSubmit}>
                    추가하기
                </button>

                {/* 
                <div className="submitBtn">
                    <img src={submitImg} alt="추가하기 이미지" />
                    <input
                        type="submit"
                        value="추가하기"
                        alt="아이템 추가하기"
                        className="submit"
                    />
                </div> */}
            </form>
            <div
                className={`datepicker-modal ${
                    datepickerToggle ? "show" : "hide"
                }`}
            >
                <div className="detail">
                    <div className="due-slider">
                        <div className="select-space-wrap">
                            <div className="select-space"></div>
                            <div className="select-space"></div>
                            <div className="select-space"></div>
                        </div>
                        <div
                            className="slider-wrap year"
                            onMouseDown={(e) => handleDragStart(e, 0)}
                            onMouseMove={(e) => handleDragMove(e, 0)}
                            onMouseUp={(e) => handleDragEnd(e, 0)}
                            onTouchStart={(e) => handleDragStart(e, 0)}
                            onTouchMove={(e) => handleDragMove(e, 0)}
                            onTouchEnd={(e) => handleDragEnd(e, 0)}
                            style={{
                                transform: `translate(0, ${translateY[0]}px)`
                            }}
                        >
                            {yearArr.map((item, index) => (
                                <div
                                    className={`slider-list ${
                                        item === datepickerYear
                                            ? "selected"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="unit">년</div>

                        <div
                            className="slider-wrap month"
                            onMouseDown={(e) => handleDragStart(e, 1)}
                            onMouseMove={(e) => handleDragMove(e, 1)}
                            onMouseUp={(e) => handleDragEnd(e, 1)}
                            onTouchStart={(e) => handleDragStart(e, 1)}
                            onTouchMove={(e) => handleDragMove(e, 1)}
                            onTouchEnd={(e) => handleDragEnd(e, 1)}
                            style={{
                                transform: `translate(0, ${translateY[1]}px)`
                            }}
                        >
                            {monthArr.map((item, index) => (
                                <div
                                    className={`slider-list ${
                                        item === datepickerMonth
                                            ? "selected"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="unit">월</div>

                        <div
                            className="slider-wrap day"
                            onMouseDown={(e) => handleDragStart(e, 2)}
                            onMouseMove={(e) => handleDragMove(e, 2)}
                            onMouseUp={(e) => handleDragEnd(e, 2)}
                            onTouchStart={(e) => handleDragStart(e, 2)}
                            onTouchMove={(e) => handleDragMove(e, 2)}
                            onTouchEnd={(e) => handleDragEnd(e, 2)}
                            style={{
                                transform: `translate(0, ${translateY[2]}px)`
                            }}
                        >
                            {dayArr.map((item, index) => (
                                <div
                                    className={`slider-list ${
                                        item === datepickerDay ? "selected" : ""
                                    }`}
                                    key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="unit">일</div>
                    </div>

                    <div className="datepicker-action-buttons">
                        <div
                            className="confirm"
                            onClick={datepickerToggleSwitch}
                        >
                            확인
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItem;
