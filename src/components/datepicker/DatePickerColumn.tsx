import "@/styles/components/datepicker.scss";
import { getSelectedIndex, getTranslateY } from "@/utils/datepickerUtils";
import { getClientY } from "@/utils/dragUtils";
import React, { useEffect, useRef, useState } from "react";
import PickerItem from "./DatePickerItem";

interface PickerColumnProps {
    unit: "year" | "month" | "day";
    data: number[];
    selected: number;
    onSelect: (value: number) => void;
}

const PickerColumn = ({
    unit,
    data,
    selected,
    onSelect
}: PickerColumnProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [translateY, setTranslateY] = useState(() =>
        getTranslateY(data, selected)
    );

    const startYRef = useRef<number | null>(null);
    const moveColumnRef = useRef<HTMLDivElement>(null);

    const dragHandlers = {
        start: (
            e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
        ) => {
            setIsDragging(true);
            startYRef.current = getClientY(e);
        },

        move: (
            e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
        ) => {
            if (startYRef.current === null || !moveColumnRef.current) return;

            const currentY = getClientY(e);
            const distance = currentY - startYRef.current;
            const newY = translateY + distance;

            moveColumnRef.current.style.transform = `translateY(${newY}px)`;
            startYRef.current = currentY;
            setTranslateY(newY);
        },

        end: () => {
            setIsDragging(false);
            startYRef.current = null;

            const index = getSelectedIndex(translateY, data.length);
            const snappedValue = data[index];
            onSelect(snappedValue);

            const finalY = getTranslateY(data, snappedValue);
            setTranslateY(finalY);

            if (moveColumnRef.current) {
                moveColumnRef.current.style.transition =
                    "transform 0.2s ease-out";
                moveColumnRef.current.style.transform = `translateY(${finalY}px)`;
            }
        }
    };

    useEffect(() => {
        if (!isDragging) return;

        window.addEventListener("mousemove", dragHandlers.move);
        window.addEventListener("mouseup", dragHandlers.end);
        window.addEventListener("touchmove", dragHandlers.move);
        window.addEventListener("touchend", dragHandlers.end);

        return () => {
            window.removeEventListener("mousemove", dragHandlers.move);
            window.removeEventListener("mouseup", dragHandlers.end);
            window.removeEventListener("touchmove", dragHandlers.move);
            window.removeEventListener("touchend", dragHandlers.end);
        };
    }, [isDragging, translateY]);

    return (
        <div
            className="datepicker-column"
            ref={moveColumnRef}
            style={{
                transform: `translateY(${translateY}px)`
            }}
        >
            {data.map((item) => (
                <div
                    key={item}
                    onMouseDown={dragHandlers.start}
                    onTouchStart={dragHandlers.start}
                >
                    <PickerItem
                        value={item}
                        isActive={item === selected}
                        unit={unit}
                    />
                </div>
            ))}
        </div>
    );
};

export default PickerColumn;
