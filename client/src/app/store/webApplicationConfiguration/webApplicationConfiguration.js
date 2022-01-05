import { createSlice } from "@reduxjs/toolkit";
import { myAsyncInSlice } from "../user/userInformation";

export const webApplicationConfiguration = createSlice({
    name: "webApp",
    initialState: {
        // Determines wether a user is logged in or not
        authorization: true,
        // Determines wether the spinner should be loaded or not
        loading: false,
        // Default language is English, check src/app/language/lang.js for other options
        language: "en",
        // Determines whether the left side of the Dashboard pops out or not
        drawer: false,
    },
    reducers: {
        // User has successfully sign-in and authenticated by JWT
        authorizeUser: (state, action) => {
            state.authorization = true;
        },
        // User's localStorage token has been removed or has selected the sign-out button
        unauthorizeUser: (state, action) => {
            state.authorization = false;
        },
        // 
        changeStatus: (state, action) => {
            state.status = !state.status;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload.language === "en" ? "tl" : "en";
        },
        revertDrawer: (state, action) => {
            state.drawer = !state.drawer;
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

export const { 
    authorizeUser, 
    unauthorizeUser,
    changeStatus,
    changeLanguage,
    revertDrawer
} = webApplicationConfiguration.actions;

export default webApplicationConfiguration.reducer;
