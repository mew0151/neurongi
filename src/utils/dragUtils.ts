export function getClientY(
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): number {
    if ("touches" in e) {
        return e.touches[0].clientY;
    }
    return e.clientY;
}

export function getClientX(
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): number {
    if ("touches" in e) {
        return e.touches[0].clientX;
    }
    return (e as MouseEvent).clientX;
}
