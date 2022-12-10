import {combineReducers, configureStore } from "@reduxjs/toolkit";
import breakSlice from "./breakSlice";
import sessionSlice from "./sessionSlice";
import timerSlice from "./timerSlice";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key:"root",
    storage: sessionStorage
}

const rootReducer = combineReducers({
    breakReducer: breakSlice.reducer,
    sessionReducer: sessionSlice.reducer,
    timerReducer: timerSlice.reducer
});

const persistedRootReducer = persistReducer(persistConfig ,rootReducer);

const store = configureStore({reducer: persistedRootReducer, middleware:[thunk]});
export const persistor = persistStore(store);
export {store};
