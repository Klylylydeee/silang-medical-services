import { createSlice } from "@reduxjs/toolkit";

export const calendarConfiguration = createSlice({
    name: "calendar",
    initialState: {
        cell: {
            "2022/02/08": [
                { type: "success", content: "This is usual event1." },
                { type: "success", content: "This is usual event2." }
            ]
        }
    },
    reducers: {
        addCellData: (state, action) => {
            state.cell = action.payload.cell;
        },
        resetCell:  (state, action) => {
            state.cell = {};
        }
    }
});

export const { 
    addCellData,
    resetCell
} = calendarConfiguration.actions;

export default calendarConfiguration.reducer;
