import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        isSession: true,
        isRunning: false,
        secondsLeft: 1500,
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
        }
    }
});
export const timerActions =  timerSlice.actions;
export default timerSlice;
