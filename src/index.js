import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./scss/global.scss";

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>loading...</div>} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
