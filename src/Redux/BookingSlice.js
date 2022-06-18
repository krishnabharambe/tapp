import { createSlice } from "@reduxjs/toolkit";

export const BookingSlice = createSlice({
    name: "loading",
    initialState: {
        loadingview : false,
        mybookings: {
            
        }
    },

    reducers: {
        startloading: (state) => {
            state.loadingview = true;
        },
        stoploading: (state,) => {
            state.loadingview = false;
        },
        viewMyBooking: (state, action) => {
            console.log("action.payload", action.payload)
            state.mybookings = action.payload;
        },
    },
});

export const { startloading, stoploading, viewMyBooking
 } = BookingSlice.actions
export default BookingSlice.reducer;