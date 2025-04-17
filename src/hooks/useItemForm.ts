import { timestampToYMD, YMDToTimestamp } from "@/utils/dateUtils";
import { ChangeEvent, useState } from "react";
import useQtyControl from "./useQtyControl";

type ItemForm = {
    id: number;
    name: string;
    emoji: string;
    qty: number;
    dateTimeStamp: number;
    folder: string;
};

const useItemForm = (initialTimestamp?: number) => {
    const { update } = useQtyControl();

    const timestamp = initialTimestamp ?? Date.now();

    const initialYMD = timestampToYMD(timestamp);

    const [year, setYear] = useState(() => initialYMD.year);
    const [month, setMonth] = useState(() => initialYMD.month);
    const [day, setDay] = useState(() => initialYMD.day);

    const [form, setForm] = useState<Omit<ItemForm, "qty">>({
        id: Date.now(),
        name: "",
        emoji: "",
        dateTimeStamp: timestamp,
        folder: "default poket"
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        console.log(form);
    };

    const dateFormChange = (y: number, m: number, d: number) => {
        const getTimestamp = YMDToTimestamp(y, m, d);
        setForm((prev) => ({ ...prev, dateTimeStamp: getTimestamp }));
    };

    return {
        form,
        handleFormChange,
        dateFormChange,
        date: { year, month, day, setYear, setMonth, setDay }
    };
};

export default useItemForm;
