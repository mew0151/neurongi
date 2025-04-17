"use client";

import "@/styles/pages/items.scss";

import Header from "@/components/layout/Header";
import { useRouter } from "next/navigation";
import useItemList from "@/hooks/useItemList";

const AllItems = () => {
    // const folder = String(useParams().folder);
    const router = useRouter();

    const { items } = useItemList();

    const handleSelectFolder = (folder: string) => {
        router.push(`/${folder}`, { scroll: false });
    };

    return (
        <div className="items">
            <Header pageName="all-items" />
            <div className="items-container">
                {items.map((item) => (
                    <div className="item" key={item.id}>
                        <p>{item.emoji}</p>
                        <div className="item-information">
                            <div>
                                <span className="item-qty size-m weight-medium">
                                    <span className="sign">#</span>
                                    {item.qty}
                                </span>
                                <span className="size-l weight-medium">
                                    {item.name}
                                </span>
                            </div>
                            <div className="size-m weight-medium">
                                <span className="sign">@</span>
                                folder-123&ensp;·&ensp;2일 지남
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={() => handleSelectFolder("add-item")}>
                    add-item
                </button>
            </div>
        </div>
    );
};

export default AllItems;
