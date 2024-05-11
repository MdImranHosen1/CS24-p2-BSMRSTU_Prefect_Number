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

export const getWorkForces = createAsyncThunk('workForces/getWorkForces', async () => {
    const response = await axios.get('http://localhost:5000/workforce-registration');
    return response.data;
});

export const postWorkForce = createAsyncThunk('workForces/postWorkForce', async (workForceData) => {
    const response = await axios.post('http://localhost:5000/workforce-registration', workForceData);
    return response.data;
});

export const getWorkForceById = createAsyncThunk('workForces/getWorkForceById', async (workForceId) => {
    const response = await axios.get(`http://localhost:5000/workforce-registration/${workForceId}`);
    return response.data;
});

export const updateWorkForce = createAsyncThunk('workForces/updateWorkForce', async ({ workForceId, workForceData }) => {
    const response = await axios.put(`http://localhost:5000/workforce-registration/${workForceId}`, workForceData);
    return response.data;
});

export const deleteWorkForceById = createAsyncThunk('workForces/deleteWorkForceById', async (workForceId) => {
    const response = await axios.delete(`http://localhost:5000/workforce-registration/${workForceId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const workForcesSlice = createSlice({
    name: 'workForces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWorkForces.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getWorkForces.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getWorkForces.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            .addCase(postWorkForce.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postWorkForce.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postWorkForce.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding workforce';
            })
            .addCase(getWorkForceById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getWorkForceById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single workforce data
                state.loading = 'idle';
            })
            .addCase(getWorkForceById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching workforce';
            })
            .addCase(updateWorkForce.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateWorkForce.fulfilled, (state, action) => {
                const updatedWorkForce = action.payload;
                const index = state.data.findIndex(workForce => workForce.id === updatedWorkForce.id);
                if (index !== -1) {
                    state.data[index] = updatedWorkForce;
                }
                state.loading = 'idle';
            })
            .addCase(updateWorkForce.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating workforce';
            })
            .addCase(deleteWorkForceById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteWorkForceById.fulfilled, (state, action) => {
                const workForceId = action.payload;
                state.data = state.data.filter(workForce => workForce.id !== workForceId);
                state.loading = 'idle';
            })
            .addCase(deleteWorkForceById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting workforce';
            });
    },
});

export default workForcesSlice.reducer;
