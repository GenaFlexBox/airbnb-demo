import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface logginModal {
    isOpen: boolean;
}

const initialState: logginModal = {
    isOpen: false
}

export const logginModallSlice = createSlice({
    name: 'logginModal',
    initialState,
    reducers: {
        handlerOpen(state, action: PayloadAction<boolean>)  {
			state.isOpen = action.payload
		},
    },
})

export const { handlerOpen } = logginModallSlice.actions;
export default logginModallSlice.reducer;