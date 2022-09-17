
import GlobalReducer from './Reducer'
import { configureStore } from '@reduxjs/toolkit'
import  { DatabaseMiddleware } from './Middleware'


export default configureStore({
    reducer: {
        'globalState': GlobalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(DatabaseMiddleware)
});