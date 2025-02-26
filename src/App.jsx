import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import AddItem from "./pages/AddItem";
import AddFolder from "./pages/AddFolder";

import Header from "./components/Header";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/add-folder" element={<AddFolder />} />
            </Routes>
        </div>
    );
};

export default App;
