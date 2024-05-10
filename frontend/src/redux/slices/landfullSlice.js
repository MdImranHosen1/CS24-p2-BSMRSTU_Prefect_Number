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
export const getLandfills = createAsyncThunk('landfills/getLandfills', async () => {
    const response = await axios.get('http://localhost:5000/landfills');
    return response.data;
});

export const postLandfill = createAsyncThunk('landfills/postLandfill', async (landfillData) => {
    const response = await axios.post('http://localhost:5000/landfills', landfillData);
    return response.data;
});

export const getLandfillById = createAsyncThunk('landfills/getLandfillById', async (landfillId) => {
    const response = await axios.get(`http://localhost:5000/landfills/${landfillId}`);
    return response.data;
});

export const updateLandfill = createAsyncThunk('landfills/updateLandfill', async ({ landfillId, landfillData }) => {
    const response = await axios.put(`http://localhost:5000/landfills/${landfillId}`, landfillData);
    return response.data;
});

export const deleteLandfillById = createAsyncThunk('users/deleteLandfillById', async (landfillId) => {
    const response = await axios.delete(`http://localhost:5000/landfills/${landfillId}`);
    return response.data;
});



const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const landfillsSlice = createSlice({
    name: 'landfill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Cases for getLandfills
            .addCase(getLandfills.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getLandfills.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getLandfills.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            // Cases for postLandfill
            .addCase(postLandfill.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postLandfill.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postLandfill.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding Landfills';
            })
            // Cases for getLandfillById
            .addCase(getLandfillById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getLandfillById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming getLandfillById returns a single item
                state.loading = 'idle';
            })
            .addCase(getLandfillById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching Landfill by id';
            })
            // Cases for updateLandfill
            .addCase(updateLandfill.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateLandfill.fulfilled, (state, action) => {
                // Update the state with the updated landfillData
                const updatedIndex = state.data.findIndex(landfill => landfill.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.data[updatedIndex] = action.payload;
                }
                state.loading = 'idle';
            })
            .addCase(updateLandfill.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating Landfill';
            })
            // Cases for deleteLandfillById
            .addCase(deleteLandfillById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteLandfillById.fulfilled, (state, action) => {
                // Remove the deleted landfill from the state
                state.data = state.data.filter(landfill => landfill.id !== action.payload.id);
                state.loading = 'idle';
            })
            .addCase(deleteLandfillById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting Landfill by id';
            });
    },
});
export default landfillsSlice.reducer;
