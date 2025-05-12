type ItemType = {
    id: string;
    name: string;
    emoji: string;
    qty: number;
    dateTimeStamp: number;
    folder: string;
};

export const itemStorage = {
    get: () => {
        try {
            return JSON.parse(localStorage.getItem("items") ?? "[]");
        } catch {
            return [];
        }
    },
    set: (items: ItemType[]): void => {
        try {
            localStorage.setItem("items", JSON.stringify(items));
        } catch {
            console.error("로컬스토리지에서 데이터 가져오기 실패");
        }
    }
};
