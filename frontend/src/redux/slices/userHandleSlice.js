import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post('http://localhost:5000/auth/login', userData);

    return response.data;
});

const UserHandleSlice = createSlice({
    name: "userType",
    initialState: { userData: null },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userDetails");
            state.userData = null; 
        },
        loginReload: (state) => {
            const userDataString = localStorage.getItem("userDetails");
            const userData = JSON.parse(userDataString);
            if (userData) {
                state.userData = userData;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userData = action.payload;
                localStorage.setItem("userDetails", JSON.stringify(action.payload));

                state.loading = 'idle';
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding user';
            });
    },
});

export const { logout, loginReload } = UserHandleSlice.actions;

export default UserHandleSlice.reducer;
