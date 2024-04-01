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

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
    const response = await axios.get('http://localhost:5000/users/roles');
    return response.data;
});

export const postRole = createAsyncThunk('roles/postRole', async (roleData) => {
    const response = await axios.post('http://localhost:5000/users/rabc/roles', roleData);
    return response.data;
});

export const getRoleById = createAsyncThunk('roles/getRoleById', async (roleId) => {
    console.log("roleId", roleId)
    const response = await axios.get(`http://localhost:5000/users/roles/${roleId}`);
    return response.data;
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ roleId, roleData }) => {
    const response = await axios.put(`http://localhost:5000/users/roles/${roleId}`, roleData);
    return response.data;
});

export const deleteRoleById = createAsyncThunk('roles/deleteRoleById', async (roleId) => {
    const response = await axios.delete(`http://localhost:5000/users/roles/${roleId}`);
    return response.data;
});

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.data = action.payload;
                    state.loading = 'idle';
                }
            })
            .addCase(getRoles.rejected, (state) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = 'Error occurred while fetching roles';
                }
            })
            .addCase(postRole.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postRole.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = 'idle';
            })
            .addCase(postRole.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while adding role';
            })
            .addCase(getRoleById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getRoleById.fulfilled, (state, action) => {
                state.data = [action.payload]; // Assuming single role data
                state.loading = 'idle';
            })
            .addCase(getRoleById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while fetching role';
            })
            .addCase(updateRole.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                const updatedRole = action.payload;
                const index = state.data.findIndex(role => role.id === updatedRole.id);
                if (index !== -1) {
                    state.data[index] = updatedRole;
                }
                state.loading = 'idle';
            })
            .addCase(updateRole.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while updating role';
            })
            .addCase(deleteRoleById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteRoleById.fulfilled, (state, action) => {
                const roleId = action.payload;
                state.data = state.data.filter(role => role.id !== roleId);
                state.loading = 'idle';
            })
            .addCase(deleteRoleById.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error occurred while deleting role';
            });
    },
});

export default rolesSlice.reducer;
