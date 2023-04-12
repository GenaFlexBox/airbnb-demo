import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface rentModal {
    isOpen: boolean;
}

const initialState: rentModal = {
    isOpen: false
}

export const rentModalSlice = createSlice({
    name: 'rentModal',
    initialState,
    reducers: {
        handlerOpen(state, action: PayloadAction<boolean>)  {
			state.isOpen = action.payload
		},
    },
})

export const { handlerOpen } = rentModalSlice.actions;
export default rentModalSlice.reducer;