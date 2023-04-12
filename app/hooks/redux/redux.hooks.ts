import React from "react";
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;