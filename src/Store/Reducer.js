import { createSlice } from '@reduxjs/toolkit'

export const GlobalState = createSlice({
    name: 'globalState',
    initialState: {
        apps: [],
        currentFocusedApp: null,
        config: {
            handleMouse: false
        },
        windowHasFocus: true,
        ui: {
            showSettings: false
        }
    },
    reducers: {
        setFocusApp: (state, action) => {
            state.currentFocusedApp = action.payload.currentFocusedApp
        },
        setApps: (state, action) => {
            state.apps = [...action.payload.filter((app) => app.favourite), ...action.payload.filter((app) => !app.favourite)] // we want all favourites firsts
        },
        setAppFavourite: (state, action) => {
            let itemToUpdate = state.apps.filter((app) => app.id === action.payload.id)[0];
            itemToUpdate.favourite = action.payload.favourite;
            // if it's an add to Favourite, we want that the new favourite item first of the list
            if (action.payload.favourite) {
                state.apps = [itemToUpdate, ...state.apps.filter((app) => app.id != action.payload.id)]
            }
            // else it's a remove and we add it just after favourites
            else {
                state.apps = [...state.apps.filter((app) => app.favourite), itemToUpdate, ...state.apps.filter((app) => !app.favourite && app.id != action.payload.id)]
            }
            state.currentFocusedApp = itemToUpdate;
        },
        setAppVisibility: (state, action) => {
            state.apps = state.apps.map((app) => app.id === action.payload.id ? {...app, hidden: action.payload.hidden} : app )
        },
        setMouseSupport: (state, action) => {
            state.config.handleMouse = action.payload;
        },
        setWindowFocusState: (state, action) => {
            state.windowHasFocus = action.payload;
        },
        toggleSettingsPopin: (state, action) => {
            state.ui.showSettings = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { 
    setFocusApp, 
    setApps, 
    setAppFavourite, 
    setAppVisibility, 
    setMouseSupport, 
    setWindowFocusState, 
    toggleSettingsPopin } = GlobalState.actions

export default GlobalState.reducer