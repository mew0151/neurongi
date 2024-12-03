const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: [
        {
            id: 1,
            name: "애플망고",
            qty: 10,
            emogi: "🥭",
            date: 1730764800000,
            folder: "all"
        },
        {
            id: 2,
            name: "슾하게띠",
            qty: 1,
            emogi: "🍝",
            date: 1731024000000,
            folder: "all"
        },
        {
            id: 3,
            name: "멜론",
            qty: 1,
            emogi: "🍈",
            date: 1732924800000,
            folder: "all"
        }
    ]
};

export const itemSlice = createSlice({
    name: "items",
    initialState: initialState,
    reducers: {
        adjustQty: (state, action) => {
            const { id, type, qty } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (!item) return;

            if (type === "increase") {
                if (qty < 999) item.qty += 1;
            } else if (type === "decrease") {
                if (item.qty > 1) item.qty -= 1;
                else state.items = state.items.filter((item) => item.id !== id);
            }
        },

        addItem: (state, action) => {
            state.items.push(action.payload);
        }
    }
});

export const { adjustQty, addItem } = itemSlice.actions;
export default itemSlice.reducer;
