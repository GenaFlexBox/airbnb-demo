import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface registerModal {
    isOpen: boolean;
}

const initialState: registerModal = {
    isOpen: false
}

export const registerModalSlice = createSlice({
    name: 'registerModal',
    initialState,
    reducers: {
        handlerOpen(state, action: PayloadAction<boolean>)  {
			state.isOpen = action.payload
		},
    },
})

export const { handlerOpen } = registerModalSlice.actions;
export default registerModalSlice.reducer;