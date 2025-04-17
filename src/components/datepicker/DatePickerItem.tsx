import "@/styles/components/datepicker.scss";

interface PickerItemProps {
    value: number;
    isActive: boolean;
    unit: "year" | "month" | "day";
}

const getUnitSuffix = (unit: PickerItemProps["unit"]) => {
    if (unit === "year") return "년";
    if (unit === "month") return "월";
    if (unit === "day") return "일";
    return "";
};

const PickerItem = ({ value, isActive, unit }: PickerItemProps) => {
    return (
        <div
            className={`datepicker-item ${
                isActive ? "datepicker-item-active" : ""
            } size-l`}
        >
            {value}
            {getUnitSuffix(unit)}
        </div>
    );
};

export default PickerItem;
