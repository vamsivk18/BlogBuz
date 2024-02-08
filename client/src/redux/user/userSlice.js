import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    success: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initRefresh:(state)=>{
            state.loading = false
            state.error = null
            state.success = null
        },
        signInStart:(state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure:(state,action) => {
            state.loading = false
            state.error = action.payload
        },
        signOut:(state)=>{
            state.currentUser = null
            state.loading = false
            state.error = null
            state.success = null
        },
        updateUserStart:(state)=>{
            state.loading = true
            state.error = null
            state.success = null
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload.userInfo
            state.loading = false
            state.error = null
            state.success = action.payload.message
        },
        updateUserNothing:(state)=>{
            state.success = 'Nothing to Update'
            state.loading=false
            state.error = null
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
            state.success = null
        },
        createPostStart:(state)=>{
            state.loading = true
            state.error = null
            state.success = null
        },
        createPostSuccess:(state,action)=>{
            state.loading = false
            state.error = null
            state.success = action.payload
        },
        createPostFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
            state.success = null
        }
    }
})

export const { 
    initRefresh,
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    updateUserNothing,
    createPostStart,
    createPostSuccess,
    createPostFailure
    } = userSlice.actions

export default userSlice.reducer