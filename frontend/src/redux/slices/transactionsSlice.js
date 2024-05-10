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

export const getTransactions = createAsyncThunk('transactions/getTransactions', async () => {
    const response = await axios.get('http://localhost:5000/sts/transaction');
    return response.data;
});

export const postTransaction = createAsyncThunk('transactions/postTransaction', async (transactionData) => {
    const response = await axios.post('http://localhost:5000/sts/transaction', transactionData);
    return response.data;
});

export const getTransactionById = createAsyncThunk('transactions/getTransactionById', async (transactionId) => {
    const response = await axios.get(`http://localhost:5000/sts/transaction/${transactionId}`);
    return response.data;
});

export const updateTransaction = createAsyncThunk('transactions/updateTransaction', async ({ transactionId, transactionData }) => {
    const response = await axios.put(`http://localhost:5000/sts/transaction/${transactionId}`, transactionData);
    return response.data;
});

export const deleteTransactionById = createAsyncThunk('transactions/deleteTransactionById', async (transactionId) => {
    const response = await axios.delete(`http://localhost:5000/sts/transaction/${transactionId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getTransactions.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching transactions';
                }
            })
            .addCase(postTransaction.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postTransaction.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding transaction';
            })
            .addCase(getTransactionById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getTransactionById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single transaction data
                state.loading = 'idle';
            })
            .addCase(getTransactionById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching transaction';
            })
            .addCase(updateTransaction.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const updatedTransaction = action.payload;
                const index = state.data.findIndex(transaction => transaction.id === updatedTransaction.id);
                if (index !== -1) {
                    state.data[index] = updatedTransaction;
                }
                state.loading = 'idle';
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating transaction';
            })
            .addCase(deleteTransactionById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteTransactionById.fulfilled, (state, action) => {
                const transactionId = action.payload;
                state.data = state.data.filter(transaction => transaction.id !== transactionId);
                state.loading = 'idle';
            })
            .addCase(deleteTransactionById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting transaction';
            });
    },
});

export default transactionsSlice.reducer;
