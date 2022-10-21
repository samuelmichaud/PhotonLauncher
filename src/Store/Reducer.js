import { createSlice } from '@reduxjs/toolkit'
import { MAIN_INPUT_MOUSE, SHOW_POPIN_NONE, SCAN_JOB_STATUS_NOT_STARTED, LANG_OPTION_ENGLISH, LAUNCH_OPTION_STARTUP } from '../Constants';

export const GlobalState = createSlice({
    name: 'globalState',
    initialState: {
        apps: [],
        currentFocusedApp: null,
        config: {
            mainInput: MAIN_INPUT_MOUSE, // mouse / gamepad / keyboard
            lang: LANG_OPTION_ENGLISH,
            launchOption: LAUNCH_OPTION_STARTUP
        },
        windowHasFocus: true,
        ui: {
            popin: SHOW_POPIN_NONE // settings, scan...
        },
        scanJob: {
            status: SCAN_JOB_STATUS_NOT_STARTED, // not_started, ongoing_scan, ongoing_fetchmetadata, completed
            progress: 0, // from 0 to 100 basis
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
        setMainInputSupport: (state, action) => {
            state.config.mainInput = action.payload;
        },
        setWindowFocusState: (state, action) => {
            state.windowHasFocus = action.payload;
        },
        togglePopin: (state, action) => {
            state.ui.popin = action.payload;
        },
        setScanJobDetail: (state, action) => {
            state.scanJob.status = action.payload.status;
            state.scanJob.progress = action.payload.progress;
        },
        setLanguage: (state, action) => {
            state.config.lang = action.payload;
        },
        setLaunchOption: (state, action) => {
            state.config.launchOption = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { 
    setFocusApp, 
    setApps, 
    setAppFavourite, 
    setAppVisibility, 
    setMainInputSupport, 
    setWindowFocusState, 
    togglePopin,
    setLanguage,
    setLaunchOption,
    setScanJobDetail } = GlobalState.actions

export default GlobalState.reducer