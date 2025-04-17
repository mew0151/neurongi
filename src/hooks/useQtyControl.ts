import { useState } from "react";

const useQtyControl = (initialQty: number = 1) => {
    const [qty, setQty] = useState<number>(initialQty);

    const increase = () => setQty((prev) => prev + 1);
    const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : prev));

    const update = (value: number) => setQty(value);

    return { qty, increase, decrease, update };
};

export default useQtyControl;
