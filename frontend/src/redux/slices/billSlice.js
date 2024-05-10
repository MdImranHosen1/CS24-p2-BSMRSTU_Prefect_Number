// billSlice.js

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

export const getBills = createAsyncThunk('bills/getBills', async () => {
    const response = await axios.get('http://localhost:5000/landfills/bills');
    return response.data;
});

export const getBillById = createAsyncThunk('bills/getBillById', async (billId) => {
    const response = await axios.get(`http://localhost:5000/landfills/bills/${billId}`);
    return response.data;
});

export const postBill = createAsyncThunk('bills/postBill', async (billData) => {
    const response = await axios.post('http://localhost:5000/landfills/bills', billData);
    return response.data;
});

export const updateBill = createAsyncThunk('bills/updateBill', async ({ billId, billData }) => {
    const response = await axios.put(`http://localhost:5000/landfills/bills/${billId}`, billData);
    return response.data;
});

export const deleteBillById = createAsyncThunk('bills/deleteBillById', async (billId) => {
    const response = await axios.delete(`http://localhost:5000/landfills/bills/${billId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBills.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getBills.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getBills.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching bills';
                }
            })
            .addCase(getBillById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getBillById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single bill data
                state.loading = 'idle';
            })
            .addCase(getBillById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching bill';
            })
            .addCase(postBill.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postBill.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postBill.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding bill';
            })
            .addCase(updateBill.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateBill.fulfilled, (state, action) => {
                const updatedBill = action.payload;
                const index = state.data.findIndex(bill => bill.id === updatedBill.id);
                if (index !== -1) {
                    state.data[index] = updatedBill;
                }
                state.loading = 'idle';
            })
            .addCase(updateBill.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating bill';
            })
            .addCase(deleteBillById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteBillById.fulfilled, (state, action) => {
                const billId = action.payload;
                state.data = state.data.filter(bill => bill.id !== billId);
                state.loading = 'idle';
            })
            .addCase(deleteBillById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting bill';
            });
    },
});

export default billsSlice.reducer;
