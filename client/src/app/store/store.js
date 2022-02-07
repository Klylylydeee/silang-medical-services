import { configureStore } from "@reduxjs/toolkit";

// import logger from "redux-logger"

import userInformation from "src/app/store/user/userInformation";
import webApplicationConfiguration from "src/app/store/web/webInformation";
 
const reducer = configureStore({
    reducer: {
        web: webApplicationConfiguration,
        user: userInformation
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
})

export default reducer;