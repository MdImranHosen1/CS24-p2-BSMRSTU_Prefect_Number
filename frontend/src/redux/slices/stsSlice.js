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


export const getSts = createAsyncThunk('sts/getSts', async () => {
    const response = await axios.get('http://localhost:5000/sts');
    return response.data;
});

export const postSts = createAsyncThunk('sts/postSts', async (userSts) => {
    console.log("res ", userSts);
    const response = await axios.post('http://localhost:5000/sts', userSts);

    return response.data;
});



export const getStsById = createAsyncThunk('sts/getStsById', async (stsId) => {
    const response = await axios.get(`http://localhost:5000/sts/${stsId}`);
    return response.data;
});

export const updateSts = createAsyncThunk('sts/updateSts', async ({ stsId, stsData }) => {
    const response = await axios.put(`http://localhost:5000/sts/${stsId}`, stsData);
    return response.data;
});

export const deleteStsById = createAsyncThunk('sts/deleteStsById', async (stsId) => {
    const response = await axios.delete(`http://localhost:5000/sts/${stsId}`);
    return response.data;
});


const initialState = {
    data: [
       
    ],
    loading: 'idle',
    error: null,
};

export const stsSlice = createSlice({
    name: 'sts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Cases for getSts
            .addCase(getSts.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getSts.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getSts.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred';
                }
            })
            // Cases for postSts
            .addCase(postSts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postSts.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postSts.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding sts';
            })
            // Cases for getStsById
            .addCase(getStsById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getStsById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming getStsById returns a single item
                state.loading = 'idle';
            })
            .addCase(getStsById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching sts by id';
            })
            // Cases for updateSts
            .addCase(updateSts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateSts.fulfilled, (state, action) => {
                // Update the state with the updated stsData
                const updatedIndex = state.data.findIndex(sts => sts.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.data[updatedIndex] = action.payload;
                }
                state.loading = 'idle';
            })
            .addCase(updateSts.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating sts';
            })
            // Cases for deleteStsById
            .addCase(deleteStsById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteStsById.fulfilled, (state, action) => {
                // Remove the deleted sts from the state
                state.data = state.data.filter(sts => sts.id !== action.payload.id);
                state.loading = 'idle';
            })
            .addCase(deleteStsById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting sts by id';
            });
    },
});

export default stsSlice.reducer;
