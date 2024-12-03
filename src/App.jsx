import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/main.scss";

import Main from "./pages/Main";
import AddItem from "./pages/AddItem";
import AddFolder from "./pages/AddFolder";

import Topbar from "./components/Topbar";

const App = () => {
    return (
        <div className="container">
            <Topbar />
            <div className="fixed-height-topbar"></div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/add-folder" element={<AddFolder />} />
            </Routes>
        </div>
    );
};

export default App;
