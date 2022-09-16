import 'joypad.js';

import store from './Store/Store';
import { setAppFavourite, setAppVisibility, setMouseSupport } from './Store/Reducer'

let state = null;

store.subscribe(() => {
    state = store.getState().globalState;
});

// Util function to trigger keyboard events that will do a navigation on NoriginSpacialNavigation library
const triggerKey = (key) => {
    if (document && document.hasFocus()){
        switch(key) {
            case 'ArrowUp':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp', 'keyCode': 38, 'bubbles': true}));
                break;
            case 'ArrowDown': 
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown', 'keyCode': 40, 'bubbles': true}));
                break;
            case 'ArrowRight':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight', 'keyCode': 39, 'bubbles': true}));
                break;
            case 'ArrowLeft':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft', 'keyCode': 37, 'bubbles': true})); 
                break;
            case 'Enter': // 'A' in a XBOX controller
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', 'keyCode': 13, 'bubbles': true}));
                break;
            case 'ToggleFavourite': // 'Y' in a XBOX controller
                if (state.currentFocusedApp && state.currentFocusedApp.id) {
                    store.dispatch(setAppFavourite({id: state.currentFocusedApp.id, favourite: !state.currentFocusedApp.favourite }));
                }
                break;
            case 'ToggleHideView': // 'X' in a XBOX controller
                if (state.currentFocusedApp && state.currentFocusedApp.id) {
                    store.dispatch(setAppVisibility({id: state.currentFocusedApp.id, hidden: !state.currentFocusedApp.hidden }));
                }
                break;
        }
    }
} 

/**
 * LISTENERS FOR ALL INPUTS EVENTS
 */

// Listener for keybord events.
// Arrows & Enter keys are tracked by the NoriginNavigation Library
document.addEventListener('keyup', (event) => {
    if (event.key === 'f') {
        triggerKey('ToggleFavourite');
        } else if (event.key === 'h') {
        triggerKey('ToggleHideView');
        }
        
    // if a key is triggered, we want to remove mouse support
    store.dispatch(setMouseSupport(false));
});

// When the user move a mouse we want to re-enable mouse support
document.addEventListener('mousemove', () => {
    store.dispatch(setMouseSupport(true));
}, {passive: true});

/* Use gamepad for TV navigation */
window.joypad.set({axisMovementThreshold: 0.3});

window.joypad.on('button_press', e => {
    const { buttons } = e.detail.gamepad;

    // We need a shortcut to bring the app to front
    if ((buttons[4].pressed || buttons[5].pressed ) && (buttons[8].pressed || buttons[9].pressed)) {
    window.ShadowApi.triggerAltTab(buttons[5].pressed); // The left button trigger a reverse alt tab (ALT + SHIFT + TAB)
    };

    // For navigation purposes 
    if (buttons[12].pressed) triggerKey('ArrowUp');
    if (buttons[13].pressed) triggerKey('ArrowDown');
    if (buttons[14].pressed) triggerKey('ArrowLeft');
    if (buttons[15].pressed) triggerKey('ArrowRight');
    if (buttons[0].pressed)  triggerKey('Enter'); // 'A'
    if (buttons[2].pressed)  triggerKey('ToggleHideView'); // 'X'
    if (buttons[3].pressed)  triggerKey('ToggleFavourite'); // 'Y'
});

// Shortcut to do a alt-tab
window.joypad.on('button_release', e => {
    const { buttonName } = e.detail;

    // When the "menu" button is release, we need to unsubscribe (release) alt (+ shift if reverse) keys
    if (buttonName == 'button_8' || buttonName == 'button_9') {
    window.ShadowApi.releaseAltTab();
    };
});

window.joypad.on('axis_move', e => {
    const { directionOfMovement } = e.detail;
    if (directionOfMovement == 'top') triggerKey('ArrowUp');
    if (directionOfMovement == 'bottom') triggerKey('ArrowDown');
    if (directionOfMovement == 'left') triggerKey('ArrowLeft');
    if (directionOfMovement == 'right') triggerKey('ArrowRight');
});

