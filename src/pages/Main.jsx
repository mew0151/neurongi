import React from "react";
import ItemFolder from "../components/ItemFolder";
import Items from "../components/Items";

const Main = () => {
    return (
        <>
            <ItemFolder />
            <div className="fixed-height-itemfolder"></div>
            <Items />
        </>
    );
};

export default Main;
