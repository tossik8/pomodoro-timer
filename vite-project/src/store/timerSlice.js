import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        isSession: true,
        isRunning: false,
        secondsLeft: 1500,
        sessionSeconds: 1500,
        timeoutSeconds: 300
    },
    reducers:{
        changeIsSession(state, action){
            state.isSession = action.payload;
        },
        changeIsRunning(state, action){
            state.isRunning = action.payload;
        },
        changeSecondsLeft(state, action){
            state.secondsLeft = action.payload;
        },
        reduceSecondsLeft(state){
            --state.secondsLeft;
        },
        changeTimeoutSeconds(state, action){
            state.timeoutSeconds = action.payload;
        },
        changeSessionSeconds(state, action){
            state.sessionSeconds = action.payload;
        }
    }
});
export const timerActions =  timerSlice.actions;
export default timerSlice;
