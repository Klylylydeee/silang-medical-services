import { createSlice } from "@reduxjs/toolkit";
import { myAsyncInSlice } from "../user/userInformation";

export const loadingStatus = createSlice({
    name: "loading",
    initialState: {
        status: false
    },
    reducers: {
        changeStatus: (state, action) => {
            console.log("changing status")
            state.status = !state.status;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(myAsyncInSlice.fulfilled, (state, action) => {
            console.log("this is from loading")
            console.log(state.status)
            state.status = !state.status
            console.log(state.status)
        });
        builder.addCase(myAsyncInSlice.rejected, (state, action) => {
            console.log("this is from loading")
            state.status = !state.status;
        });
    }
});

export const { changeStatus } = loadingStatus.actions;

export default loadingStatus.reducer;