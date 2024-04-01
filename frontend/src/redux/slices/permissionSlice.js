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

export const getPermissions = createAsyncThunk('permissions/getPermissions', async () => {
    const response = await axios.get('http://localhost:5000/rabc/permissions');
    return response.data;
});

export const postPermission = createAsyncThunk('permissions/postPermission', async (permissionData) => {
    const response = await axios.post('http://localhost:5000/rabc/permissions', permissionData);
    return response.data;
});

export const getPermissionById = createAsyncThunk('permissions/getPermissionById', async (permissionId) => {
    const response = await axios.get(`http://localhost:5000/rabc/permissions/${permissionId}`);
    return response.data;
});

export const updatePermission = createAsyncThunk('permissions/updatePermission', async ({ permissionId, permissionData }) => {
    const response = await axios.put(`http://localhost:5000/rabc/permissions/${permissionId}`, permissionData);
    return response.data;
});

export const deletePermissionById = createAsyncThunk('permissions/deletePermissionById', async (permissionId) => {
    const response = await axios.delete(`http://localhost:5000/rabc/permissions/${permissionId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPermissions.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getPermissions.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getPermissions.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching permissions';
                }
            })
            .addCase(postPermission.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postPermission.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postPermission.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding permission';
            })
            .addCase(getPermissionById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getPermissionById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single permission data
                state.loading = 'idle';
            })
            .addCase(getPermissionById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching permission';
            })
            .addCase(updatePermission.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updatePermission.fulfilled, (state, action) => {
                const updatedPermission = action.payload;
                const index = state.data.findIndex(permission => permission.id === updatedPermission.id);
                if (index !== -1) {
                    state.data[index] = updatedPermission;
                }
                state.loading = 'idle';
            })
            .addCase(updatePermission.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating permission';
            })
            .addCase(deletePermissionById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deletePermissionById.fulfilled, (state, action) => {
                const permissionId = action.payload;
                state.data = state.data.filter(permission => permission.id !== permissionId);
                state.loading = 'idle';
            })
            .addCase(deletePermissionById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting permission';
            });
    },
});

export default permissionsSlice.reducer;
