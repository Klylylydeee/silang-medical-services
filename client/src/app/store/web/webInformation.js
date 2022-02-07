import { createSlice } from "@reduxjs/toolkit";

export const webApplicationConfiguration = createSlice({
    name: "web",
    initialState: {
        authorization: true,
        loading: false,
        language: "en",
        drawer: false,
        dimension: ""
    },
    reducers: {
        authorizeUser: (state, action) => {
            state.authorization = true;
            state.language = action.payload.language;
        },
        unauthorizeUser: (state, action) => {
            state.authorization = false;
            state.language = "en";
        },
        changeStatus: (state, action) => {
            state.status = !state.status;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload.language === "en" ? "tl" : "en";
        },
        revertDrawer: (state, action) => {
            state.drawer = action.payload.drawer;
        },
        changeDimension: (state, action) => {
            state.dimension = action.payload.dimension
            console.log(state.dimension)
        },
        changeLoader: (state, action) => {
            state.loading = action.payload.loading
        }
    }
});

export const { 
    authorizeUser, 
    unauthorizeUser,
    changeStatus,
    changeLanguage,
    revertDrawer,
    changeDimension,
    changeLoader
} = webApplicationConfiguration.actions;

export default webApplicationConfiguration.reducer;
