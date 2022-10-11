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
    position: absolute;
    height: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;
    background: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0));
    padding: 1rem ${FRAME_PADDING}rem;
    z-index: 99;
    gap: 3rem;
    font-size: 2.5rem;
`

export const NavHelper = () => {
    
    // @ts-ignore (because of globalState which is not recognized)
    const { config } = useSelector((state) => state.globalState);
    const { t } = useTranslation();

    return ( 
            <NavHelperWrapper>
                <NavItemHelper>
                    {config.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="down"/> }
                    {config.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="left" /> }
                    {config.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='E'/> }
                    <span>{t('NavHelperLaunch')}</span>
                </NavItemHelper>
                <NavItemHelper>
                    {config.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="up"/> }
                    {config.mainInput === MAIN_INPUT_MOUSE && <MouseIcon button="right" /> }
                    {config.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='F'/> }
                    <span>{t('NavHelperFavourite')}</span>
                </NavItemHelper>
                
                {config.mainInput !== MAIN_INPUT_MOUSE &&
                    <NavItemHelper>
                        {config.mainInput === MAIN_INPUT_GAMEPAD && <GamepadButton direction="left"/> }
                        {config.mainInput === MAIN_INPUT_KEYBOARD && <KeyboardLetterIcon letter='H'/> }
                        <span>{t('NavHelperHide')}</span>
                    </NavItemHelper>
                }
            </NavHelperWrapper>
    )
}