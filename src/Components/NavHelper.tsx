import React, {useEffect} from 'react';
import { FRAME_PADDING } from '../Constants';
import { GamepadButton } from '../Images/GamepadButton';
import { MouseIcon } from '../Images/MouseIcon';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

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
    height: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;
    background: linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));
    padding: 1rem ${FRAME_PADDING}rem;
    z-index: 99;
    gap: 3rem;
    font-size: 2rem;
`

export const NavHelper = () => {
    
    // @ts-ignore (because of globalState which is not recognized)
    const { config } = useSelector((state) => state.globalState);

    return ( 
            <NavHelperWrapper>
                <NavItemHelper>
                    {!config.handleMouse? 
                        <GamepadButton direction="down"/>: <MouseIcon button="left" />
                    }
                    <span>{'Launch'}</span>
                </NavItemHelper>
                <NavItemHelper>
                    {!config.handleMouse? 
                        <GamepadButton direction="up"/>: <MouseIcon button="right" />
                    }
                    <span>{'Favourite'}</span>
                </NavItemHelper>
                
                {!config.handleMouse? 
                    <NavItemHelper>
                        <GamepadButton direction="left"/>
                        <span>{'Hide'}</span>
                    </NavItemHelper>
                    : ''}
            </NavHelperWrapper>
    )
}