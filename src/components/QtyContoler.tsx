import { useItemList } from "@/context/ItemListContext";
import "@/styles/components/item.scss";

const QtyControler = ({ activeItemId }: { activeItemId: string | null }) => {
    const { itemList, updateItem, deleteItem } = useItemList();

    const activeItem = itemList.find((item) => item.id === activeItemId);
    if (!activeItem) return null;

    const handleIncrease = () => {
        updateItem({ ...activeItem, qty: activeItem.qty + 1 });
    };

    const handleDecrease = () => {
        if (activeItem.qty === 1) {
            if (window.confirm("이 아이템을 영원히.. 삭제할게요오...????")) {
                deleteItem(activeItem.id);
            } else {
                alert("쫄앗네...ㅋ");
            }
        } else if (activeItem.qty > 1) {
            updateItem({ ...activeItem, qty: activeItem.qty - 1 });
        }
    };
    return (
        <div className="qty-controler">
            <div className="qty-control-btn" onClick={handleDecrease}>
                [ {activeItem.qty === 1 ? `🗑️` : `-`} ]
            </div>
            <div>{activeItem.qty}</div>
            <div className="qty-control-btn" onClick={handleIncrease}>
                [ + ]
            </div>
        </div>
    );
};

export default QtyControler;
