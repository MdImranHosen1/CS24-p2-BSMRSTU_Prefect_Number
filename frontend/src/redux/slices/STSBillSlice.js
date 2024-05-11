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

export const getSTSBills = createAsyncThunk('stsBills/getSTSBills', async () => {
    const response = await axios.get('http://localhost:5000/bill-generation-sts');
    return response.data;
});

export const postSTSBill = createAsyncThunk('stsBills/postSTSBill', async (billData) => {
    const response = await axios.post('http://localhost:5000/bill-generation-sts', billData);
    return response.data;
});

export const deleteSTSBillById = createAsyncThunk('stsBills/deleteSTSBillById', async (billId) => {
    const response = await axios.delete(`http://localhost:5000/bill-generation-sts/${billId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const stsBillsSlice = createSlice({
    name: 'stsBills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSTSBills.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getSTSBills.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getSTSBills.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching STS bills';
                }
            })
            .addCase(postSTSBill.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postSTSBill.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postSTSBill.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding STS bill';
            })
            .addCase(deleteSTSBillById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteSTSBillById.fulfilled, (state, action) => {
                const billId = action.payload;
                state.data = state.data.filter(bill => bill.id !== billId);
                state.loading = 'idle';
            })
            .addCase(deleteSTSBillById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting STS bill';
            });
    },
});

export default stsBillsSlice.reducer;
