import { useState } from "react";

interface ItemFormState {
    name: string;
    emoji: string;
    folder: string;
    dateTimeStamp: number;
    qty: number;
}

export function useItemForm() {
    const date = new Date().getTime();

    const [form, setForm] = useState<ItemFormState>({
        emoji: "",
        name: "",
        folder: "",
        dateTimeStamp: date,
        qty: 1
    });

    const updateField = <K extends keyof ItemFormState>(
        field: K,
        value: ItemFormState[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setForm({
            emoji: "",
            name: "",
            folder: "",
            dateTimeStamp: date,
            qty: 1
        });
    };

    const editForm = (item: ItemFormState) => {
        setForm({
            emoji: item.emoji,
            name: item.name,
            folder: item.folder,
            dateTimeStamp: item.dateTimeStamp,
            qty: item.qty
        });
    };

    return {
        form,
        updateField,
        resetForm,
        editForm
    };
}
