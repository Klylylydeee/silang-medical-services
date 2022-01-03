import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "src/app/util/axios";
import { changeStatus } from "src/app/store/loading/loadingStatus"

export const myAsyncInSlice = createAsyncThunk(
    'user/login',
    async (userData, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        // do await axios here
        try {
            console.log("running")
            let postAcceptTransaction = await axiosAPI.get("");
            console.log(postAcceptTransaction.data, "this is paramater passed")
            // if(userData === "data") {
            //     throw new Error(userData)
            // }
            return postAcceptTransaction.data
        } catch(err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    },
    // options
    {
        // condition: (userId, { getState, extra }) => {
        //     const { users } = getState()
        //     const fetchStatus = users.requests[userId]
        //     if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
        //         // Already fetched or in progress, don't need to re-fetch
        //         return false
        //     }
        // }
    }
);

export const userInformation = createSlice({
    name: "user",
    initialState: {
        name: "tester123",
        role: undefined,
        email: undefined,
        user_picture: undefined
    },
    reducers: {
        signIn: (state, action) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.user_picture = action.payload.user_picture;
        },
        signOut: (state, action) => {
            state.name = undefined;
            state.role = undefined;
            state.email = undefined;
            state.user_picture = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(myAsyncInSlice.pending, (state, action) => {
            console.log(state.name)
            console.log(action)
        });
        builder.addCase(myAsyncInSlice.fulfilled, (state, action) => {
            console.log("finished")
            console.log(action)
            changeStatus()
            // state.name = action.payload.body
        });
        builder.addCase(myAsyncInSlice.rejected, (state, action) => {
            console.log("error")
            state.name = action.error.message
        });
    }
});

export const { signIn, signOut } = userInformation.actions;

export default userInformation.reducer;