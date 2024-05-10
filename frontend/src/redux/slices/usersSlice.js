import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    return userDetails ? userDetails.token : null;
};

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
});

export const postUser = createAsyncThunk('users/postUser', async (userData) => {
    const response = await axios.post('http://localhost:5000/users', userData);
    return response.data;
});

export const getUserById = createAsyncThunk('users/getUserById', async (userId) => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }) => {

    const response = await axios.put(`http://localhost:5000/users/${userId}`, userData);
    return response.data;
});

export const deleteUserById = createAsyncThunk('users/deleteUserById', async (userId) => {

    // console.log("first", userId)
    const response = await axios.delete(`http://localhost:5000/users/${userId}`);
    // console.log("second", userId)
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getUsers.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            .addCase(postUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postUser.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding user';
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single user data
                state.loading = 'idle';
            })
            .addCase(getUserById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching user';
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.data.findIndex(user => user.id === updatedUser.id);
                if (index !== -1) {
                    state.data[index] = updatedUser;
                }
                state.loading = 'idle';
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating user';
            })
            .addCase(deleteUserById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                const userId = action.payload;
                state.data = state.data.filter(user => user.id !== userId);
                state.loading = 'idle';
            })
            .addCase(deleteUserById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting user';
            });
    },
});

export default usersSlice.reducer;
