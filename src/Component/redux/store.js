import { configureStore } from "@reduxjs/toolkit";
import astroReducer from './astroSlice'
export const store=configureStore({
    reducer:astroReducer
})