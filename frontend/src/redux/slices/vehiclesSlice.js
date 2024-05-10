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

export const getVehicles = createAsyncThunk('vehicles/getVehicles', async () => {
    const response = await axios.get('http://localhost:5000/vehicles');
    return response.data;
});

export const postVehicle = createAsyncThunk('vehicles/postVehicle', async (vehicleData) => {
    const response = await axios.post('http://localhost:5000/vehicles', vehicleData);
    return response.data;
});

export const getVehicleById = createAsyncThunk('vehicles/getVehicleById', async (vehicleId) => {
    const response = await axios.get(`http://localhost:5000/vehicles/${vehicleId}`);
    return response.data;
});

export const updateVehicle = createAsyncThunk('vehicles/updateVehicle', async ({ vehicleId, vehicleData }) => {
    const response = await axios.put(`http://localhost:5000/vehicles/${vehicleId}`, vehicleData);
    return response.data;
});

export const deleteVehicleById = createAsyncThunk('vehicles/deleteVehicleById', async (vehicleId) => {
    const response = await axios.delete(`http://localhost:5000/vehicles/${vehicleId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVehicles.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getVehicles.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getVehicles.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching vehicles';
                }
            })
            .addCase(postVehicle.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postVehicle.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postVehicle.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding vehicles';
            })
            .addCase(getVehicleById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getVehicleById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single vehicle data
                state.loading = 'idle';
            })
            .addCase(getVehicleById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching vehicle';
            })
            .addCase(updateVehicle.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const updatedVehicle = action.payload;
                const index = state.data.findIndex(vehicle => vehicle.id === updatedVehicle.id);
                if (index !== -1) {
                    state.data[index] = updatedVehicle;
                }
                state.loading = 'idle';
            })
            .addCase(updateVehicle.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating vehicle';
            })
            .addCase(deleteVehicleById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteVehicleById.fulfilled, (state, action) => {
                const vehicleId = action.payload;
                state.data = state.data.filter(vehicle => vehicle.id !== vehicleId);
                state.loading = 'idle';
            })
            .addCase(deleteVehicleById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting vehicle';
            });
    },
});

export default vehiclesSlice.reducer;
