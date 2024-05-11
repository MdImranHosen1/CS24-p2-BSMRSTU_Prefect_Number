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

export const getMonitorTransportedWaste = createAsyncThunk('monitorTransportedWaste/getMonitorTransportedWaste', async () => {
    const response = await axios.get('http://localhost:5000/monitor-transported-waste');
    return response.data;
});

export const postMonitorTransportedWaste = createAsyncThunk('monitorTransportedWaste/postMonitorTransportedWaste', async (wasteData) => {
    const response = await axios.post('http://localhost:5000/monitor-transported-waste', wasteData);
    return response.data;
});

export const getMonitorTransportedWasteById = createAsyncThunk('monitorTransportedWaste/getMonitorTransportedWasteById', async (wasteId) => {
    const response = await axios.get(`http://localhost:5000/monitor-transported-waste/${wasteId}`);
    return response.data;
});

export const updateMonitorTransportedWaste = createAsyncThunk('monitorTransportedWaste/updateMonitorTransportedWaste', async ({ wasteId, wasteData }) => {
    const response = await axios.put(`http://localhost:5000/monitor-transported-waste/${wasteId}`, wasteData);
    return response.data;
});

export const deleteMonitorTransportedWasteById = createAsyncThunk('monitorTransportedWaste/deleteMonitorTransportedWasteById', async (wasteId) => {
    const response = await axios.delete(`http://localhost:5000/monitor-transported-waste/${wasteId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const monitorTransportedWasteSlice = createSlice({
    name: 'monitorTransportedWaste',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMonitorTransportedWaste.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getMonitorTransportedWaste.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getMonitorTransportedWaste.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            .addCase(postMonitorTransportedWaste.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postMonitorTransportedWaste.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postMonitorTransportedWaste.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding waste data';
            })
            .addCase(getMonitorTransportedWasteById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getMonitorTransportedWasteById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single waste data
                state.loading = 'idle';
            })
            .addCase(getMonitorTransportedWasteById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching waste data';
            })
            .addCase(updateMonitorTransportedWaste.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateMonitorTransportedWaste.fulfilled, (state, action) => {
                const updatedWaste = action.payload;
                const index = state.data.findIndex(waste => waste.id === updatedWaste.id);
                if (index !== -1) {
                    state.data[index] = updatedWaste;
                }
                state.loading = 'idle';
            })
            .addCase(updateMonitorTransportedWaste.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating waste data';
            })
            .addCase(deleteMonitorTransportedWasteById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteMonitorTransportedWasteById.fulfilled, (state, action) => {
                const wasteId = action.payload;
                state.data = state.data.filter(waste => waste.id !== wasteId);
                state.loading = 'idle';
            })
            .addCase(deleteMonitorTransportedWasteById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting waste data';
            });
    },
});

export default monitorTransportedWasteSlice.reducer;
