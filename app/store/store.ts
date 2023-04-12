import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerModalReducer from "./reducers/registerModal.reducer";
import loginModalReducer from "./reducers/loginModal.reducer";
import rentModalSlice from "./reducers/rentModal.reducer";

const rootReducer = combineReducers({
    registerModalReducer,
    loginModalReducer,
    rentModalSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']