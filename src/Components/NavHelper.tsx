import React, {useCallback, useEffect} from 'react';
import { togglePopin, setAppFavourite, setAppVisibility } from '../Store/Reducer';
import { FRAME_PADDING, GRADIENT_BOTTOM_LEFT, GRADIENT_TOP_RIGHT, MAIN_INPUT_GAMEPAD, MAIN_INPUT_KEYBOARD, MAIN_INPUT_MOUSE, NAVHELPER_HEIGHT, SHOW_POPIN_APP_ACTION, SHOW_POPIN_NONE, ZINDEX_NAVHELPER } from '../Constants';
import { GamepadButton } from '../Images/GamepadButton';
import { MouseIcon } from '../Images/MouseIcon';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { KeyboardLetterIcon } from './../Images/KeyboardLetterIcon';

interface NavHelperProps {
    
}

const NavItemHelper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const NavHelperWrapper = styled.div<NavHelperProps>`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    box-sizing: border-box;
    height: ${NAVHELPER_HEIGHT}rem;
    color: white;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;
    box-shadow: 0px -7px 10px rgb(0 0 0 / 30%);
    padding: 1rem ${FRAME_PADDING}rem;
    z-index: ${ZINDEX_NAVHELPER};
    gap: 3rem;
    font-size: 2rem;
`

export const NavHelper = () => {
    
    // @ts-ignore (because of globalState which is not recognized)
    const { ui, currentFocusedApp } = useSelector((state) => state.globalState);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        
        // Show AppAction popin
        let showAppListeners: Array<string> = ['MouseRightClic', 'a', 'GamePadLeftButton'];
        const showAppAction = () => {
            if (currentFocusedApp && currentFocusedApp.id) {
                dispatch(togglePopin({id: SHOW_POPIN_APP_ACTION, context: currentFocusedApp.id}));
            }
        };
        showAppListeners.forEach(event => document.addEventListener(event, showAppAction));

        // Add or remove App from favourite
        let favouriteListeners: Array<string> = ['f', 'GamePadUpButton'];
        const favouriteAppAction = () => {
            if (currentFocusedApp && currentFocusedApp.id) {
                dispatch(setAppFavourite({id: currentFocusedApp.id, favourite: !currentFocusedApp.favourite }));
            }
        }
        favouriteListeners.forEach(event => document.addEventListener(event, favouriteAppAction));

        // Hide / unhide app
        let hideAppListeners: Array<string> = ['h'];
        const hideAppAction = () => {
            if (currentFocusedApp && currentFocusedApp.id) {
                dispatch(setAppVisibility({id: currentFocusedApp.id, hidden: !currentFocusedApp.hidden }));
            }
        }
        hideAppListeners.forEach(event => document.addEventListener(event, hideAppAction));

        // Clean up listener before next useEffect (in next render)
        return () => {
            showAppListeners.forEach(eventListener => document.removeEventListener(eventListener, showAppAction));
            favouriteListeners.forEach(eventListener => document.removeEventListener(eventListener, favouriteAppAction));
            hideAppListeners.forEach(eventListener => document.removeEventListener(eventListener, hideAppAction));
        }
    }, [currentFocusedApp]);

    // compute the nav layout so the JSX is easier to read
    let navLayout = 'generic';
    if (currentFocusedApp && currentFocusedApp.id) {
        navLayout = 'contentGrid';
    } else if (ui.popin.id !== SHOW_POPIN_NONE) {
        navLayout = 'popin';
    }

    return (
        <div>
            {navLayout === 'generic' && 
                <NavHelperWrapper>
                    <NavItemHelper>
                        {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="down"/> }
                        {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="left" /> }
                        {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter={t('NavHelperEnterButton')}/> }
                        <span>{t('NavHelperSelectButton')}</span>
                    </NavItemHelper>
                </NavHelperWrapper>
            }
            {navLayout === 'popin' && 
                <NavHelperWrapper>
                    <NavItemHelper>
                        {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="down"/> }
                        {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="left" /> }
                        {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter={t('NavHelperEnterButton')}/> }
                        <span>{t('NavHelperSelectButton')}</span>
                    </NavItemHelper>

                    {ui.mainInput !== MAIN_INPUT_MOUSE &&
                        <NavItemHelper>
                            {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="right"/> }
                            {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter={t('NavHelperEscapeButton')}/> }
                            <span>{t('NavHelperClosePopin')}</span>
                        </NavItemHelper>
                    }
                </NavHelperWrapper>
            }
            {navLayout === 'contentGrid' && 
                <NavHelperWrapper>
                    <NavItemHelper>
                        {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="down"/> }
                        {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="left" /> }
                        {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter={t('NavHelperEnterButton')}/> }
                        <span>{t('NavHelperLaunch')}</span>
                    </NavItemHelper>

                    <NavItemHelper>
                            {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="left"/> }
                            {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="right" /> }
                            {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='A'/> }
                            <span>{t('NavHelperActions')}</span>
                    </NavItemHelper>

                    {ui.mainInput !== MAIN_INPUT_MOUSE &&
                        <NavItemHelper>
                            {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="up"/> }
                            {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='F'/> }
                            <span>{t('NavHelperFavourite')}</span>
                        </NavItemHelper>
                    }
                    
                    {ui.mainInput === MAIN_INPUT_KEYBOARD &&
                        <NavItemHelper>
                            <KeyboardLetterIcon letter='H'/>
                            <span>{t('NavHelperHide')}</span>
                        </NavItemHelper>
                    }
                </NavHelperWrapper>
            }
        </div>
    )
}