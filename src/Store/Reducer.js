const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPS':
            return {
                ...state,
                apps: [...action.payload.filter((app) => app.favourite), ...action.payload.filter((app) => !app.favourite)] // we want all favourites firsts
            };
        case 'SET_APP_FAVOURITE':
            let itemToUpdate = state.apps.filter((app) => app.id === action.id)[0];
            itemToUpdate.favourite = action.favourite;
            // if it's an add to Favourite, we want that the new favourite item first of the list
            if (action.favourite) {
                return {
                    ...state,
                    apps: [itemToUpdate, ...state.apps.filter((app) => app.id != action.id)]
                };
            }
            // else it's a remove and we add it just after favourites
            return {
                ...state,
                apps: [...state.apps.filter((app) => app.favourite), itemToUpdate, ...state.apps.filter((app) => !app.favourite && app.id != action.id)]
            }
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