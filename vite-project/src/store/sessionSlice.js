import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: "session",
    initialState:{
        duration: 25,
        isEnabled: true
    },
    reducers:{
        increase(state){
            if(state.duration < 60)
                ++state.duration;
        },
        decrease(state){
            if(state.duration > 1)
                --state.duration;
        },
        handleIsEnabled(state, action){
            state.isEnabled = action.payload;
        }
    }
});
export const sessionActions = sessionSlice.actions;
export default sessionSlice;
