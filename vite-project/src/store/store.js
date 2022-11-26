import { configureStore } from "@reduxjs/toolkit";
import breakSlice from "./breakSlice";
import sessionSlice from "./sessionSlice";
import timerSlice from "./timerSlice";

const store = configureStore({
    reducer:{
        breakReducer: breakSlice.reducer,
        sessionReducer: sessionSlice.reducer,
        timerReducer: timerSlice.reducer
    }
});
export default store;
