import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sliderReducer from "./sliderSlice";
import bookingReducer from "./BookingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    slider:sliderReducer,
    booking:bookingReducer
  },
  // reducer: {
  //   user: userReducer,
  //   post: postReducer,
  // },
});