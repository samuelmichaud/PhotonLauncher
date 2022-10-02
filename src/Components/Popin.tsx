import React, { useEffect } from 'react';
import styled from 'styled-components';
import { POPIN_BG_COLOR, FRAME_PADDING, POPIN_SIZE_SMALL, POPIN_SIZE_MEDIUM, POPIN_SIZE_LARGE } from './../Constants'


interface PopinProps {
    children?: any;
    title?: string;
    size?: string;
}

const PopinWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 999;
`
const PopinOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 50%);
    backdrop-filter: blur(5px);
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
                    height: 30vh;
                    width: 30vw;
                `
            case POPIN_SIZE_MEDIUM:
                return `
                    height: 50vh;
                    width: 50vw;
                `
            case POPIN_SIZE_LARGE:
            default:
                return `
                    height: 90vh;
                    width: 70vw;
                `
        }
    }}
    background: ${POPIN_BG_COLOR};
    padding: 2rem ${FRAME_PADDING}rem;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-align: center;
    margin: 1rem 0;
    font-size: 2.5rem;
`

export const Popin = ({children, title, size}: PopinProps) => {
    
    return (
        <PopinWrapper>
            <PopinOverlay />
            <PopinBox size={size}>
                <Title>{title}</Title>
                {children}
            </PopinBox>
        </PopinWrapper>
    )
}