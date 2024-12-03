import React from "react";

import Button from "./Button";

const ItemFolder = () => {
    const handle = () => {};
    return (
        <div className="item-folder">
            <Button
                className="btn-active"
                onClick={handle}
                phrase="all items"
            />
        </div>
    );
};

export default ItemFolder;
