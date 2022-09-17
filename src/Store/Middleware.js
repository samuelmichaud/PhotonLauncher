
export const DatabaseMiddleware = store => next => action => {
    
    if (action.type == 'globalState/setApps' || action.type == 'globalState/setAppVisibility' || action.type == 'globalState/setAppFavourite') {
        next(action); // we need to apply the new state before accessing it
        window.ShadowApi.storeDatabase(store.getState().globalState.apps);
        return next(action);
    }
    return next(action);
}