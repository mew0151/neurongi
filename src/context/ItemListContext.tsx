"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { itemStorage } from "@/utils/itemStorage";

export type ItemType = {
    id: string;
    name: string;
    emoji: string;
    qty: number;
    dateTimeStamp: number;
    folder: string;
};

type ItemListContextType = {
    itemList: ItemType[];
    addItem: (item: ItemType) => void;
    updateItem: (item: ItemType) => void;
    deleteItem: (id: string) => void;
};

const ItemListContext = createContext<ItemListContextType | null>(null);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
    const [itemList, setItemList] = useState<ItemType[]>([]);

    useEffect(() => {
        const storedItems = itemStorage.get();
        setItemList(storedItems);
    }, []);

    const save = (updated: ItemType[]) => {
        itemStorage.set(updated);
        setItemList(updated);
    };

    const addItem = (item: ItemType) => save([...itemList, item]);
    const updateItem = (updatedItem: ItemType) =>
        save(itemList.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    const deleteItem = (id: string) =>
        save(itemList.filter((i) => i.id !== id));

    return (
        <ItemListContext.Provider
            value={{ itemList, addItem, updateItem, deleteItem }}
        >
            {children}
        </ItemListContext.Provider>
    );
};

export const useItemList = (): ItemListContextType => {
    const ctx = useContext(ItemListContext);
    if (!ctx)
        throw new Error("useItemList must be used within ItemListProvider");
    return ctx;
};
