
import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    apps: [],
    config: {}
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <GlobalState.Provider value={[state, dispatch]}>
            {children}
        </GlobalState.Provider>
    )
};

export const GlobalState = createContext(initialState);
export default Store;