const INIT_POSITION = 132;
const ITEM_HEIGHT = 44;
const VISIBLE_COUNT = 7;
const CENTER_OFFSET = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

export const getTranslateY = (data: number[], selected: number): number => {
    const index = data.findIndex((v) => v === selected);
    return CENTER_OFFSET - index * ITEM_HEIGHT;
};

export function getSelectedIndex(translateY: number, length: number): number {
    const initIndex = INIT_POSITION / ITEM_HEIGHT;
    const roughIndex = translateY / ITEM_HEIGHT;
    const index = Math.round(roughIndex) - initIndex;
    return -1 * index;
}

export function getSnappedPosition(data: number[], index: number): number {
    const date = data.find((item) => index === item);
    console.log(date);
    return 0;
}
