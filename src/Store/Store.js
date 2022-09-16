
import GlobalReducer from './Reducer'
import { configureStore } from '@reduxjs/toolkit'


export default configureStore({
    reducer: {
        'globalState': GlobalReducer
    }
});