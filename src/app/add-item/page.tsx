"use client";

import "@/styles/pages/add-item.scss";
import Header from "@/components/layout/Header";
import DatePickerModal from "@/components/datepicker/DatePickerModal";

import useQtyControl from "@/hooks/useQtyControl";
import useItemForm from "@/hooks/useItemForm";
import useItemList from "@/hooks/useItemList";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

// images
import Image from "next/image";
import EmptyEmoji from "/public/images/icon/empty-emogi.svg";
import QtyIcon from "/public/images/icon/add-item-qty.svg";
import DecreaseIcon from "/public/images/icon/add-item-decrease.svg";
import IncreaseIcon from "/public/images/icon/add-item-increase.svg";
import CalendarIcon from "/public/images/icon/add-item-datepicker.svg";
import FolderIcon from "/public/images/icon/add-item-selectfolder.svg";

import { useRouter } from "next/navigation";

export default function AddItem() {
    const { qty, increase, decrease } = useQtyControl();

    const router = useRouter();
    const { date, dateFormChange, handleFormChange, form } = useItemForm();
    const { year, month, day, setYear, setMonth, setDay } = date;
    const { items, addItem } = useItemList();

    const [isDatePicker, setIsDatePicker] = useState(false);

    const emojiRef = useRef<HTMLInputElement>(null);

    const handleEmojiChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFormChange(e);

        if (e.target.value.length > 1) {
            console.log("hi");
            emojiRef.current?.blur();
        }
    };
    const test = () => {
        addItem({ ...form, qty }); // 리스트에 추가 + localStorage 저장
        router.push("/all-items");
    };

    return (
        <div className="add-item">
            <Header pageName="add item" />
            <div className="add-item-container">
                {form.emoji === "" ? (
                    <div className="emoji-input">
                        <input
                            type="text"
                            name="emoji"
                            value={form.emoji}
                            inputMode="text"
                            onChange={handleEmojiChange}
                        />
                        <Image
                            src={EmptyEmoji}
                            alt="empty emoji"
                            width="40"
                            height="40"
                        />
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            name="emoji"
                            value={form.emoji}
                            inputMode="text"
                            onChange={handleEmojiChange}
                        />
                    </div>
                )}

                <input
                    type="text"
                    name="name"
                    className="item-name size-xxl weight-bold"
                    placeholder="New item"
                    value={form.name}
                    onChange={handleFormChange}
                />

                <div className="category weight-medium">부가 정보</div>
                <div className="qty-control">
                    <input
                        type="number"
                        name="qty"
                        value={qty}
                        onChange={handleFormChange}
                        pattern="[0-9]*"
                        inputMode="decimal"
                        className="qty size-xl"
                    />
                    <Image
                        src={QtyIcon}
                        alt="qty icon"
                        width={54}
                        height={54}
                    />
                    <div className="qty-control-btn">
                        <Image
                            src={DecreaseIcon}
                            onClick={decrease}
                            alt="decrease icon"
                            width={26}
                            height={26}
                            priority={true}
                        />
                        <Image
                            src={IncreaseIcon}
                            onClick={increase}
                            alt="increase icon"
                            width={26}
                            height={26}
                            priority={true}
                        />
                    </div>
                </div>
                <div className="date-control">
                    {isDatePicker && (
                        <DatePickerModal
                            date={{
                                year,
                                month,
                                day,
                                setYear,
                                setMonth,
                                setDay
                            }}
                            onClose={() => {
                                dateFormChange(year, month, day);
                                setIsDatePicker(false);
                            }}
                        />
                    )}

                    <div
                        className="date-detail size-xl"
                        onClick={() => setIsDatePicker(true)}
                    >
                        <div>
                            {year}
                            <span>년</span>
                        </div>
                        <div>
                            {month}
                            <span>월</span>
                        </div>
                        <div>
                            {day}
                            <span>일</span>
                        </div>
                    </div>

                    <Image
                        src={CalendarIcon}
                        alt="calendar image"
                        width={64}
                        height={54}
                    />
                </div>

                <div className="category">분류</div>
                <div className="select-folder">
                    <Image
                        src={FolderIcon}
                        alt="folder icon"
                        width={54}
                        height={54}
                    />
                    <select name="folder" className="folder size-xl">
                        <option value="">default folder</option>
                        <option value="">test</option>
                    </select>
                </div>
                <button onClick={test}>츄가츄</button>
            </div>
        </div>
    );
}
