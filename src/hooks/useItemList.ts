"use client";
import { itemStorage } from "@/utils/itemStorage";
import { useEffect, useState } from "react";

type ItemType = {
    id: string;
    name: string;
    emoji: string;
    qty: number;
    dateTimeStamp: number;
    folder: string;
};

export function useItemList() {
    const [itemList, setItemList] = useState<ItemType[]>([]);

    useEffect(() => {
        const storedItems = itemStorage.get();
        setItemList(storedItems);
    }, []);

    const addItem = (newItem: ItemType) => {
        const updatedList = [...itemList, newItem];
        itemStorage.set(updatedList);
        setItemList(updatedList);
    };

    const deleteItem = (id: string) => {
        const updatedList = itemList.filter((item) => item.id !== id);
        itemStorage.set(updatedList);
        setItemList(updatedList);
    };

    const updateItem = (updatedItem: ItemType) => {
        const updatedList = itemList.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        itemStorage.set(updatedList);
        setItemList(updatedList);
    };

    return {
        itemList,
        addItem,
        deleteItem,
        updateItem
    };
}
