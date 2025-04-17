//entry

import "@/styles/components/datepicker.scss";

import { useMemo } from "react";

import PickerColumn from "./DatePickerColumn";

import { getYearArr, getMonthArr, getDayArr } from "@/utils/dateUtils";
// import useItemForm from "@/hooks/useItemForm";

interface DatePickerModalProps {
    date: {
        year: number;
        month: number;
        day: number;
        setYear: (v: number) => void;
        setMonth: (v: number) => void;
        setDay: (v: number) => void;
    };
    onClose: () => void;
}

const DatePickerModal = ({ date, onClose }: DatePickerModalProps) => {
    const today = new Date();

    const yearArr = useMemo(() => getYearArr(today.getFullYear()), []);
    const monthArr = useMemo(() => getMonthArr(), []);
    const dayArr = useMemo(
        () => getDayArr(date.year, date.month),
        [date.year, date.month]
    );
    return (
        <div className="datepicker-modal">
            <div className="datepicer-window">
                <div className="datepicker-selector">
                    <PickerColumn
                        unit="year"
                        data={yearArr}
                        selected={date.year}
                        onSelect={date.setYear}
                    />
                    <PickerColumn
                        unit="month"
                        data={monthArr}
                        selected={date.month}
                        onSelect={date.setMonth}
                    />
                    <PickerColumn
                        unit="day"
                        data={dayArr}
                        selected={date.day}
                        onSelect={date.setDay}
                    />
                    <div className="date-picker-selected-area"></div>
                </div>
                <button onClick={onClose}>선택</button>
            </div>
        </div>
    );
};

export default DatePickerModal;
