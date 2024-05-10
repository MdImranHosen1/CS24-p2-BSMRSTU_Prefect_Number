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

export const getContractors3rdParty = createAsyncThunk('contractors3rdParty/getContractors3rdParty', async () => {
    const response = await axios.get('http://localhost:5000/third-party-contractor');
    return response.data;
});

export const postContractors3rdParty = createAsyncThunk('contractors3rdParty/postContractors3rdParty', async (contractorData) => {
    const response = await axios.post('http://localhost:5000/third-party-contractor', contractorData);
    return response.data;
});

export const getContractors3rdPartyById = createAsyncThunk('contractors3rdParty/getContractors3rdPartyById', async (contractorId) => {
    const response = await axios.get(`http://localhost:5000/third-party-contractor/${contractorId}`);
    return response.data;
});

export const updateContractors3rdParty = createAsyncThunk('contractors3rdParty/updateContractors3rdParty', async ({ contractorId, contractorData }) => {
    const response = await axios.put(`http://localhost:5000/third-party-contractor/${contractorId}`, contractorData);
    return response.data;
});

export const deleteContractors3rdPartyById = createAsyncThunk('contractors3rdParty/deleteContractors3rdPartyById', async (contractorId) => {
    const response = await axios.delete(`http://localhost:5000/third-party-contractor/${contractorId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const contractors3rdPartySlice = createSlice({
    name: 'contractors3rdParty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContractors3rdParty.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getContractors3rdParty.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getContractors3rdParty.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            .addCase(postContractors3rdParty.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postContractors3rdParty.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postContractors3rdParty.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding contractor';
            })
            .addCase(getContractors3rdPartyById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getContractors3rdPartyById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single contractor data
                state.loading = 'idle';
            })
            .addCase(getContractors3rdPartyById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching contractor';
            })
            .addCase(updateContractors3rdParty.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateContractors3rdParty.fulfilled, (state, action) => {
                const updatedContractor = action.payload;
                const index = state.data.findIndex(contractor => contractor.id === updatedContractor.id);
                if (index !== -1) {
                    state.data[index] = updatedContractor;
                }
                state.loading = 'idle';
            })
            .addCase(updateContractors3rdParty.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating contractor';
            })
            .addCase(deleteContractors3rdPartyById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteContractors3rdPartyById.fulfilled, (state, action) => {
                const contractorId = action.payload;
                state.data = state.data.filter(contractor => contractor.id !== contractorId);
                state.loading = 'idle';
            })
            .addCase(deleteContractors3rdPartyById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting contractor';
            });
    },
});

export default contractors3rdPartySlice.reducer;
