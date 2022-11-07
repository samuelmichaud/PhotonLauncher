import React, { useEffect } from 'react';
import styled from 'styled-components';
import { POPIN_BG_COLOR, FRAME_PADDING, POPIN_SIZE_SMALL, POPIN_SIZE_MEDIUM, POPIN_SIZE_LARGE, BORDER_RADIUS, ZINDEX_POPIN, NAVHELPER_HEIGHT } from '../../Constants'


interface PopinProps {
    children?: any;
    title?: string;
    size?: string;
    closeAction?: () => void;
}

const PopinWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: ${NAVHELPER_HEIGHT}rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: ${ZINDEX_POPIN};
`
const PopinOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 50%);
    backdrop-filter: blur(5px);
    animation-name: backdropAppear;
`;

interface PopinBoxProps {
    size?: string; 
}

const PopinBox = styled.div<PopinBoxProps>`
    position: relative;
    ${props => {
        switch(props.size) {
            case POPIN_SIZE_SMALL:
                return `
                    width: 30vw;
                `
            case POPIN_SIZE_MEDIUM:
                return `
                    width: 50vw;
                `
            case POPIN_SIZE_LARGE:
            default:
                return `
                    width: 70vw;
                `
        }
    }}
    background: ${POPIN_BG_COLOR};
    padding: 0rem ${FRAME_PADDING}rem 2rem ${FRAME_PADDING}rem;
    border-radius: ${BORDER_RADIUS}rem;
    overflow: hidden;
    animation-name: fadein;
    animation-duration: 0.3s;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-align: center;
    margin: 3rem 0 3rem 0;
    font-size: 2.5rem;
`

export const Popin = ({children, title, size, closeAction}: PopinProps) => {

    useEffect(() => {
        
        // Show AppAction popin
        let closePopinListeners: Array<string> = ['Escape', 'GamePadRightButton'];
        closePopinListeners.forEach(event => document.addEventListener(event, closeAction));

        // Clean up listener before next useEffect (in next render)
        return () => {
            closePopinListeners.forEach(eventListener => document.removeEventListener(eventListener, closeAction));
        }
    }, []);

    
    return (
        <PopinWrapper>
            <PopinOverlay onClick={() => closeAction()}/>
            <PopinBox size={size}>
                {title && <Title>{title}</Title>}
                {children}
            </PopinBox>
        </PopinWrapper>
    )
}