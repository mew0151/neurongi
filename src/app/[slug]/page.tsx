"use client";

import "@/styles/pages/items.scss";

import Header from "@/components/layout/Header";

import Item from "@/components/Item";

import QtyControler from "@/components/QtyContoler";
import { useState } from "react";
import { useItemList } from "@/context/ItemListContext";
import { useFolderList } from "@/context/FolderListContext";
import { useParams } from "next/navigation";
const AllItems = () => {
    const params = useParams();
    const folderId = params.slug as string | undefined;
    console.log(params);
    const { itemList, deleteItem } = useItemList();
    const { folders } = useFolderList();

    const folder = folders.find((f) => f.id === folderId);
    const folderName = folder?.name ?? "전체 보기";

    const showAll = folderId === "all-items" || !folderId;

    const filteredItems = showAll
        ? itemList
        : itemList.filter((item) => item.folder === folderId);

    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const handleClick = (id: string) => {
        if (activeItemId === id) {
            setActiveItemId(null);
        } else {
            setActiveItemId(id);
        }
    };
    return (
        <div className="items">
            <Header pageName={folderName} />
            <QtyControler activeItemId={activeItemId} />
            <div className="items-container">
                {filteredItems.map((item) => (
                    <div key={item.id}>
                        <Item
                            itemId={item.id}
                            activeItemId={activeItemId}
                            onTap={() => handleClick(item.id)}
                            onSwipeLeft={(id) => {
                                deleteItem(id);
                            }}
                            onSwipeRight={() => {
                                // setActiveItemId(null);
                                // setActiveItemId(id);
                            }}
                            setActiveItemId={setActiveItemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllItems;
