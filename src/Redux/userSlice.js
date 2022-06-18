import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {
            id: 0,
            phone: "",
            first_login: false
        },
        isLoading: false,
        result: {
            status: false,
            detail: ""
        },
        isAuth: false,
        loginCheck: {
            status: true,
            detail: ""
        },

    },
    reducers: {
        setisAuth: (state) => {
            state.isAuth = true
        },
        setisAuthFalse: (state) => {
            state.isAuth = false
        },
        startValidatingPhone: (state) => {
            state.isLoading = true;
        },
        updateUserInfo: (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        updateloginCheck: (state, action) => {
            state.isLoading = false;
            state.loginCheck = action.payload;
        },
        ValidtePhoneResult: (state, action) => {
            state.isLoading = false;
            state.result = action.payload;
        },
        stopValidatingPhone: (state) => {
            state.isLoading = false;
        },
    },
});


export const { setisAuth,
    setisAuthFalse,
    startValidatingPhone,
    updateUserInfo,
    updateloginCheck,
    ValidtePhoneResult,
    stopValidatingPhone,
} = userSlice.actions
export default userSlice.reducer;