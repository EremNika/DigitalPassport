import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import axios from "axios";
import { BASE_URL } from "@/config";

export interface UserState {
    isLoading: boolean,
    id: string;
    login: string;
    email: string;
    phone: string;
    surname: string;
    name: string;
    patronymic: string;
    createdAt: string;
    updatedAt: string;
    tokens: Tokens;
}

export interface Tokens {
    access: string;
    refresh: string;
}

const initialState: UserState = {
    isLoading: false,
    id: '',
    login: '',
    email: '',
    phone: '',
    surname: '',
    name: '',
    patronymic: '',
    createdAt: '',
    updatedAt: '',
    tokens: {
        access: '',
        refresh: ''
    },
}


export const fetchUser = createAsyncThunk<UserState>(
    'users/fetchUser',
    // Declare the type your function argument here:
    async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get<UserState>(`${BASE_URL}/users/info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state = action.payload
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state = {...action.payload, isLoading: false}
            return state
        })
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false
        })
    }
})


// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
export const { setUser } = userSlice.actions

export default userSlice.reducer
