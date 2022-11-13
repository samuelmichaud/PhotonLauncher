import { createSlice } from '@reduxjs/toolkit';
import App from '../Model/App';
import { MAIN_INPUT_MOUSE, SHOW_POPIN_NONE, SCAN_JOB_STATUS_NOT_STARTED, LANG_OPTION_ENGLISH, LAUNCH_OPTION_STARTUP, APP_PLATFORM_MANUAL, LANG_LIST_OPTIONS } from '../Constants';
import { defaultLanguage } from './lang';

export const GlobalState = createSlice({
    name: 'globalState',
    initialState: {
        apps: [],
        currentFocusedApp: null,
        config: {
            lang: defaultLanguage,
            launchOption: LAUNCH_OPTION_STARTUP
        },
        windowHasFocus: true,
        ui: {
            mainInput: MAIN_INPUT_MOUSE, // mouse / gamepad / keyboard
            popin: {
                id: SHOW_POPIN_NONE, // settings, scan...
                context: null
            }
        },
        scanJob: {
            status: SCAN_JOB_STATUS_NOT_STARTED, // not_started, ongoing_scan, ongoing_fetchmetadata, completed
            progress: 0, // from 0 to 100 basis
        }
    },
    reducers: {
        /** App management */
        setFocusApp: (state, action) => {
            state.currentFocusedApp = action.payload.currentFocusedApp
        },
        setApp: (state, action) => {
            // try to find the app, if found we merge payload & found app with it
            let appIndex = state.apps.findIndex((app) => app.id === action.payload.id);
            if (appIndex >= 0) {
                state.apps[appIndex] = {...state.apps[appIndex], ...action.payload};
            }
        },
        setApps: (state, action) => {
            state.apps = [...action.payload.filter((app) => app.favourite), ...action.payload.filter((app) => !app.favourite)] // we want all favourites firsts
        },
        addApp: (state, action) => {
            const newApp = new App({
                id: action.payload.id,
                title: action.payload.title,
                launch: action.payload.launch,
                platform: APP_PLATFORM_MANUAL
            })
            state.apps.unshift({...newApp}); // Web want to add the app first and not end (via push()). Spread is for object serialization (error if not)
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
        /** UI managment */
        setMainInputSupport: (state, action) => {
            state.ui.mainInput = action.payload;
        },
        setWindowFocusState: (state, action) => {
            state.windowHasFocus = action.payload;
        },
        togglePopin: (state, action) => {
            state.ui.popin = {
                id: action.payload.id,
                context: action.payload.context
            }
        },
        setScanJobDetail: (state, action) => {
            state.scanJob.status = action.payload.status;
            state.scanJob.progress = action.payload.progress;
        },
        /** Config management */
        setConfig: (state, action) => {
            state.config = { ...state.config, ...action.payload } // merge configs, new config override the current one
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
    addApp, 
    setApp,
    setFocusApp, 
    setApps, 
    setAppFavourite, 
    setAppVisibility, 
    setMainInputSupport, 
    setWindowFocusState, 
    togglePopin,
    setLanguage,
    setLaunchOption,
    setScanJobDetail,
    setConfig
} = GlobalState.actions

export default GlobalState.reducer