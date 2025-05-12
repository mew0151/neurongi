//entry

import "@/styles/components/datepicker.scss";

import { useMemo, useState } from "react";

import PickerColumn from "./DatePickerColumn";

import {
    getYearArr,
    getMonthArr,
    getDayArr,
    timestampToYMD,
    YMDToTimestamp
} from "@/utils/dateUtils";

interface DatePickerModalProps {
    date: number;
    onClose: (newTimestamp: number) => void;
}

const DatePickerModal = ({ date, onClose }: DatePickerModalProps) => {
    const today = useMemo(() => new Date(), []);

    const formattedDate = timestampToYMD(date);

    const yearArr = useMemo(() => getYearArr(today.getFullYear()), [today]);
    const monthArr = useMemo(() => getMonthArr(), [today]);
    const dayArr = useMemo(
        () => getDayArr(formattedDate.year, formattedDate.month),
        [formattedDate.year, formattedDate.month]
    );

    const [year, setYear] = useState<number>(formattedDate.year);
    const [month, setMonth] = useState<number>(formattedDate.month);
    const [day, setDay] = useState<number>(formattedDate.day);

    const handleSave = () => {
        if (year !== undefined && month !== undefined && day !== undefined) {
            onClose(YMDToTimestamp(year, month, day));
        } else {
            alert("무슨짔을한거지");
        }
    };
    return (
        <div className="datepicker-modal">
            <div className="datepicer-window">
                <div className="datepicker-selector">
                    <PickerColumn
                        unit="year"
                        data={yearArr}
                        selected={year}
                        onSelect={(value) => setYear(value)}
                    />
                    <PickerColumn
                        unit="month"
                        data={monthArr}
                        selected={month}
                        onSelect={(value) => setMonth(value)}
                    />
                    <PickerColumn
                        unit="day"
                        data={dayArr}
                        selected={day}
                        onSelect={(value) => setDay(value)}
                    />
                    <div className="date-picker-selected-area"></div>
                </div>
                <button onClick={() => handleSave()}>선택</button>
            </div>
        </div>
    );
};

export default DatePickerModal;
