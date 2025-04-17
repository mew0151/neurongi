"use client";
import { useEffect, useState } from "react";

type ItemForm = {
    id: number;
    name: string;
    emoji: string;
    qty: number;
    dateTimeStamp: number;
    folder: string;
};

const useItemList = () => {
    const [items, setItems] = useState<ItemForm[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("itemList");
            if (saved) {
                setItems(JSON.parse(saved));
            }
        }
    }, []);

    const addItem = (item: ItemForm) => {
        const newList = [...items, item];
        setItems(newList);
        localStorage.setItem("itemList", JSON.stringify(newList));
    };

    return { items, addItem };
};

export default useItemList;
