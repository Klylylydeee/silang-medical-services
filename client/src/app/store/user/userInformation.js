import { createSlice } from "@reduxjs/toolkit";
import toasterRequest from "src/app/util/toaster";

export const userInformation = createSlice({
    name: "user",
    initialState: {
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        phone_number: undefined,
        barangay: undefined,
        designation: undefined
    },
    reducers: {
        signIn: (state, action) => {
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.phone_number = action.payload.phone_number;
            state.barangay = action.payload.barangay;
            state.designation = action.payload.designation;
        },
        signOut: (state, action) => {
            state.first_name = undefined;
            state.last_name = undefined;
            state.email = undefined;
            state.phone_number = undefined;
            state.barangay = undefined;
            state.designation = undefined;
            toasterRequest({ payloadType: "success", textString: "No longer authorized!"});
        }
    }
});

export const { 
    signIn,
    signOut
} = userInformation.actions;

export default userInformation.reducer;