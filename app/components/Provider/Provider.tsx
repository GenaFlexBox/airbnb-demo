'use client'
import React from 'react'
import { Provider } from "react-redux";
import { setupStore } from "@/app/store/store";

type ProviderWrapperProps = {
    children: React.ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({children}) => {

    const store = setupStore();

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderWrapper