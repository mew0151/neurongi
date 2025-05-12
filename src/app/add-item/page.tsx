"use client";

import "@/styles/pages/add-item.scss";
import Header from "@/components/layout/Header";
import DatePickerModal from "@/components/datepicker/DatePickerModal";

import React, { useState } from "react";

// images
import Image from "next/image";
import EmptyEmoji from "/public/images/icon/empty-emogi.svg";
import QtyIcon from "/public/images/icon/add-item-qty.svg";
import DecreaseIcon from "/public/images/icon/add-item-decrease.svg";
import IncreaseIcon from "/public/images/icon/add-item-increase.svg";
import CalendarIcon from "/public/images/icon/add-item-datepicker.svg";
import FolderIcon from "/public/images/icon/add-item-selectfolder.svg";

import { useRouter } from "next/navigation";
import { useItemForm } from "@/hooks/useItemForm";
import { useItemList } from "@/context/ItemListContext";
import { v4 as uuidv4 } from "uuid";
import { timestampToYMD } from "@/utils/dateUtils";
import { useFolderList } from "@/hooks/folderList";

export default function AddItem() {
    const { form, updateField } = useItemForm();
    const { addItem } = useItemList();
    const router = useRouter();

    const [isDatePicker, setIsDatePicker] = useState(false);
    const [folderId, setFolderId] = useState("");
    const { folders } = useFolderList();

    const handleSubmit = () => {
        const newItem = {
            id: uuidv4(),
            name: form.name,
            emoji: form.emoji,
            dateTimeStamp: form.dateTimeStamp,
            folder: folderId,
            qty: form.qty
        };

        addItem(newItem);
        router.push("/all-items");
    };

    const qtyHandle = (direc: "-" | "+") => {
        if (direc === "-") {
            if (form.qty > 1) {
                updateField("qty", form.qty - 1);
            }
        } else {
            updateField("qty", form.qty + 1);
        }
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
                            onChange={(e) =>
                                updateField("emoji", e.target.value)
                            }
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
                            onChange={(e) =>
                                updateField("emoji", e.target.value)
                            }
                        />
                    </div>
                )}

                <input
                    type="text"
                    name="name"
                    className="item-name size-xxl weight-bold"
                    placeholder="New item"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />

                <div className="category weight-medium">부가 정보</div>
                <div className="qty-control">
                    <input
                        type="number"
                        name="qty"
                        value={form.qty}
                        onChange={(e) =>
                            updateField("qty", Number(e.target.value))
                        }
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
                            onClick={() => qtyHandle("-")}
                            alt="decrease icon"
                            width={26}
                            height={26}
                            priority={true}
                        />
                        <Image
                            src={IncreaseIcon}
                            onClick={() => qtyHandle("+")}
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
                            date={form.dateTimeStamp}
                            onClose={(newTimestamp) => {
                                console.log(newTimestamp);
                                updateField("dateTimeStamp", newTimestamp);
                                setIsDatePicker(false);
                            }}
                        />
                    )}

                    <div
                        className="date-detail size-xl"
                        onClick={() => setIsDatePicker(true)}
                    >
                        <div>
                            {timestampToYMD(form.dateTimeStamp).year}
                            <span>년</span>
                        </div>
                        <div>
                            {timestampToYMD(form.dateTimeStamp).month}
                            <span>월</span>
                        </div>
                        <div>
                            {timestampToYMD(form.dateTimeStamp).day}
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
                    <select
                        name="folder"
                        className="folder size-xl"
                        value={folderId}
                        onChange={(e) => setFolderId(e.target.value)}
                    >
                        <option value="">폴더를 선택하시긔..</option>
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSubmit}>츄가츄</button>
            </div>
        </div>
    );
}
