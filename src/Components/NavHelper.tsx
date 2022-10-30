import React, {useEffect} from 'react';
import { FRAME_PADDING, MAIN_INPUT_GAMEPAD, MAIN_INPUT_KEYBOARD, MAIN_INPUT_MOUSE } from '../Constants';
import { GamepadButton } from '../Images/GamepadButton';
import { MouseIcon } from '../Images/MouseIcon';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
    height: 3rem;
    color: white;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;
    box-shadow: 0px -7px 10px rgb(0 0 0 / 30%);
    padding: 1rem ${FRAME_PADDING}rem;
    z-index: 99;
    gap: 3rem;
    font-size: 2rem;
`

export const NavHelper = () => {
    
    // @ts-ignore (because of globalState which is not recognized)
    const { ui } = useSelector((state) => state.globalState);
    const { t } = useTranslation();

    return ( 
            <NavHelperWrapper>
                <NavItemHelper>
                    {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="down"/> }
                    {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="left" /> }
                    {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='E'/> }
                    <span>{t('NavHelperLaunch')}</span>
                </NavItemHelper>
                <NavItemHelper>
                    {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="up"/> }
                    {ui.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="right" /> }
                    {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='F'/> }
                    <span>{t('NavHelperFavourite')}</span>
                </NavItemHelper>
                
                {ui.mainInput !== MAIN_INPUT_MOUSE &&
                    <NavItemHelper>
                        {ui.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="left"/> }
                        {ui.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='H'/> }
                        <span>{t('NavHelperHide')}</span>
                    </NavItemHelper>
                }
            </NavHelperWrapper>
    )
}