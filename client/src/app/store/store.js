import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger"

import userInformation from "src/app/store/user/userInformation";
import loadingStatus from "src/app/store/loading/loadingStatus";

const reducer = configureStore({
    reducer: {
        user: userInformation,
        load: loadingStatus
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
})

export default reducer;