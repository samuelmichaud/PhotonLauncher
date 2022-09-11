const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPS':
            return {
                ...state,
                apps: action.payload
            };
        case 'SET_APP_FAVORITE':
            return {
                ...state,
                apps: state.apps.map((app) => app.id === action.id ? {...app, favourite: action.favourite} : app )
            };
        case 'SET_APP_VISIBILITY':
            return {
                ...state,
                apps: state.apps.map((app) => app.id === action.id ? {...app, hidden: action.hidden} : app )
            };
        case 'SET_MOUSE_SUPPORT':
            return {
                ...state,
                config: {
                    ...state.config,
                    handleMouse: action.payload
                }
            };
        default:
            return state;
    }
};

export default Reducer;