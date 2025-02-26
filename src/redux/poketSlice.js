import { createSlice } from "@reduxjs/toolkit";

const poketSlice = createSlice({
    name: "pokets",
    initialState: ["d", "22"],
    reducers: {
        addPoket: (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        },
        removePoket: (state, action) => {
            return state.filter((poket) => poket !== action.payload);
        }
    }
});

export const { addPoket, removePoket } = poketSlice;
export default poketSlice.reducer;
