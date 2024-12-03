import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import itemReducer from "./itemSlice";

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    items: itemReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // 비직렬화 검사 비활성화
        })
});

export const persistor = persistStore(store);
export default store;
