import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CounterState {
    value: number
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
}

export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async(amount: number) => {
        return new Promise<number>((resolve) => 
        setTimeout(() => resolve(amount), 1000))
    }
)

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value += action.payload
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer