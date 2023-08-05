import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    topRated: [],
    isOpenSidebar: false,
    searched: '',
    filter: {
        lowCarb: false,
        lowFat: false,
        lactoseFree: false,
        glutenFree: false
    },
    desktop: false
}

export const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setData: (state,action)=>{
            state.data = action.payload;
        },
        openSidebar: (state)=> {
            state.isOpenSidebar = true;
        },
        closeSidebar: (state)=> {
            state.isOpenSidebar = false;
        },
        setFilter: (state, action)=>{
            state.filter[action.payload] = !state.filter[action.payload];
        },
        setSearched: (state, action)=>{
            state.searched = String(action.payload);
        },
        setDevice: (state, action)=>{
            state.desktop = action.payload;
        },
        setTopRated: (state, action)=>{
            state.topRated = action.payload;
        }
    }
});

export default appReducer.reducer;
export const { setData, openSidebar,closeSidebar, setFilter, setSearched, setDevice, setTopRated } = appReducer.actions