import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
    name: "sliderModel",
    initialState: {
        sliderdata :[],
        sliderfetchingststatus : false
    },
    reducers: {
        startfetchingImages: (state) => {
            state.sliderfetchingststatus = true;
        },
        getSliderImages: (state, action) => {
            state.sliderdata = action.payload;
        },
        startfetchingImagesComplete: (state) => {
            state.sliderfetchingststatus = false;
        },

    },
});

export const { getSliderImages, startfetchingImages, startfetchingImagesComplete
 } = sliderSlice.actions
export default sliderSlice.reducer;