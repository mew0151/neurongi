"use client";

import { useItemList } from "@/context/ItemListContext";
import "@/styles/components/item.scss";
import { getClientX } from "@/utils/dragUtils";
import { useRef, useState } from "react";

type Props = {
    itemId: string;
    activeItemId: string | null;
    onTap: () => void;
    onSwipeLeft: (id: string) => void;
    onSwipeRight: (id: string) => void;
    setActiveItemId: (id: string | null) => void;
};

const Item = ({
    itemId,
    activeItemId,
    onTap,
    onSwipeLeft,
    onSwipeRight,
    setActiveItemId
}: Props) => {
    const startX = useRef(0);
    const isSwipe = useRef(false);
    const [swipeX, setSwipeX] = useState(0);
    const { itemList } = useItemList();
    const MIN_SWIPE_DISTANCE = 30;

    const item = itemList.find((i) => i.id === itemId);
    if (!item) return null;

    const isActive = item.id === activeItemId;

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        isSwipe.current = true;
        console.log(swipeX, "start");
        startX.current = getClientX(e);
        if (swipeX === -80 || swipeX === 80) {
            setSwipeX(0);
        }
    };

    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (isSwipe.current) {
            setActiveItemId(null);
            setSwipeX(getClientX(e) - startX.current);
        }
    };

    const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();

        isSwipe.current = false;
        if (!isSwipe.current) {
            if (swipeX < -80) {
                setSwipeX(-80); // 왼쪽으로 충분히 밀었음 → 삭제 상태
            } else if (swipeX > 80) {
                setSwipeX(80); // 오른쪽으로 충분히 밀었음 → 수정 상태
            } else if (Math.abs(swipeX) < MIN_SWIPE_DISTANCE) {
                onTap(); // 거의 안 밀림 → 탭으로 간주
                setSwipeX(0);
            }
        }
    };

    const hi = () => {
        if (window.confirm("Are you sure you want to perform this action?")) {
            onSwipeLeft(item.id);
            console.log("Action confirmed!");
        } else {
            onSwipeRight(item.id);
            console.log("Action cancelled.");
            setSwipeX(0);
        }
    };

    const wow = () => {
        console.log("edit");
    };
    return (
        <div className="item-wrap" style={{ marginLeft: swipeX }}>
            <div className="butt" onClick={wow}>
                수정
            </div>
            <div
                className={`${isActive ? `active-item` : ``} item`}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
            >
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
            <div className="buttt" onMouseDown={hi}>
                삭제
            </div>
        </div>
    );
};

export default Item;
