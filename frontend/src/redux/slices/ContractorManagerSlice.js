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

export const getContractorsManager = createAsyncThunk('contractorsManager/getContractorsManager', async () => {
    const response = await axios.get('http://localhost:5000/contractor-manager');
    return response.data;
});

export const postContractorsManager = createAsyncThunk('contractorsManager/postContractorsManager', async (contractorData) => {
    const response = await axios.post('http://localhost:5000/contractor-manager', contractorData);
    return response.data;
});

export const getContractorsManagerById = createAsyncThunk('contractorsManager/getContractorsManagerById', async (contractorId) => {
    const response = await axios.get(`http://localhost:5000/contractor-manager/${contractorId}`);
    return response.data;
});

export const updateContractorsManager = createAsyncThunk('contractorsManager/updateContractorsManager', async ({ contractorId, contractorData }) => {
    const response = await axios.put(`http://localhost:5000/contractor-manager/${contractorId}`, contractorData);
    return response.data;
});

export const deleteContractorsManagerById = createAsyncThunk('contractorsManager/deleteContractorsManagerById', async (contractorId) => {
    const response = await axios.delete(`http://localhost:5000/contractor-manager/${contractorId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const contractorsManagerSlice = createSlice({
    name: 'contractorsManager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContractorsManager.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getContractorsManager.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getContractorsManager.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            .addCase(postContractorsManager.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postContractorsManager.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postContractorsManager.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding contractor';
            })
            .addCase(getContractorsManagerById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getContractorsManagerById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single contractor data
                state.loading = 'idle';
            })
            .addCase(getContractorsManagerById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching contractor';
            })
            .addCase(updateContractorsManager.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateContractorsManager.fulfilled, (state, action) => {
                const updatedContractor = action.payload;
                const index = state.data.findIndex(contractor => contractor.id === updatedContractor.id);
                if (index !== -1) {
                    state.data[index] = updatedContractor;
                }
                state.loading = 'idle';
            })
            .addCase(updateContractorsManager.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating contractor';
            })
            .addCase(deleteContractorsManagerById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteContractorsManagerById.fulfilled, (state, action) => {
                const contractorId = action.payload;
                state.data = state.data.filter(contractor => contractor.id !== contractorId);
                state.loading = 'idle';
            })
            .addCase(deleteContractorsManagerById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting contractor';
            });
    },
});

export default contractorsManagerSlice.reducer;
