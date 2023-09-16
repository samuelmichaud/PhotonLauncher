
export const DatabaseMiddleware = store => next => action => {
    
    if (action.type == 'globalState/setApps' 
        || action.type == 'globalState/addApp' 
        || action.type == 'globalState/setApp' 
        || action.type == 'globalState/setAppVisibility' 
        || action.type == 'globalState/setAppFavourite') {
        next(action); // we need to apply the new state before accessing it
        window.PhotonApi.storeDatabase(store.getState().globalState.apps);
        return action;
        
    } else if (action.type == 'globalState/setLanguage'
        || action.type == 'globalState/setLaunchOption') {
        next(action); // we need to apply the new state before accessing it
        window.PhotonApi.storeConfig(store.getState().globalState.config);
        return action;
    }
    return next(action);
}