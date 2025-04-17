export const getYearArr = (currentYear: number, range = 10) =>
    Array.from({ length: range }, (_, i) => currentYear - 3 + i);

export const getMonthArr = (): number[] =>
    Array.from({ length: 12 }, (_, i) => i + 1);

export const getDayArr = (year: number, month: number): number[] => {
    const lastDay = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
};

export const timestampToYMD = (timestamp: number) => {
    const date = new Date(timestamp);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
};

export const YMDToTimestamp = (year: number, month: number, day: number) => {
    return new Date(year, month - 1, day).getTime();
};
