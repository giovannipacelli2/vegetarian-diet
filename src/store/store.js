import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../actions/appReducer.js'

export default configureStore({
    reducer: {
        appReducer
    }
});