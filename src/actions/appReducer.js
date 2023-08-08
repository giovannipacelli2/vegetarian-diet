import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    topRated: [],
    searchedData: [],
    isOpenSidebar: false,
    searched: '',
    filter: {
        lowCarb: {
            query: 'maxCarbs',
            queryValue: 30,
            value:false
        },
        lowFat: {
            query: 'maxFat',
            queryValue: 10,
            value:false
        },
        dairyFree: {
            query: 'intolerances',
            queryValue: 'Dairy',
            value:false
        },
        glutenFree: {
            query: 'intolerances',
            queryValue: 'Gluten',
            value:false
        },
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
        setSidebar: (state)=> {
            state.isOpenSidebar = !state.isOpenSidebar;
        },
        setFilter: (state, action)=>{
            state.filter[action.payload].value = !state.filter[action.payload].value;
        },
        setSearched: (state, action)=>{
            state.searched = String(action.payload);
        },
        setSearchedData: (state, action)=>{
            state.searchedData = action.payload;
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
export const { setData, setSidebar, setFilter, setSearched, setSearchedData, setDevice, setTopRated } = appReducer.actions