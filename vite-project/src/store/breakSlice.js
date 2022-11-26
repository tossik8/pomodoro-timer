import { createSlice } from "@reduxjs/toolkit";

const breakSlice = createSlice({
    name:"break",
    initialState:{
        timeout: 5,
        isEnabled: true
    },
    reducers: {
        increase(state){
            if(state.timeout < 60)
                ++state.timeout;
        },
        decrease(state){
            if(state.timeout > 1)
                --state.timeout;
        },
        handleIsEnabled(state, action){
            state.isEnabled = action.payload;
        }

    }
});

export const breakActions = breakSlice.actions;
export default breakSlice;
