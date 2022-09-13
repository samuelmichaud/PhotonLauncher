
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { FRAME_PADDING, GRID_COLUMN, GRID_GAP } from '../Constants';

interface AssetOverlayProps {
    launchingState: boolean;
}

export const AssetOverlay = styled.div<AssetOverlayProps>`
background: ${({ launchingState }) => (launchingState ? 'rgba(0, 0, 0, 50%);' : '')}
top: 0;
bottom: 0;
left: 0;
right: 0;
position: absolute;
`
interface AssetBoxProps {
focused: boolean;
}

export const AssetBox = styled.div<AssetBoxProps>`
width: calc((100vw - 2 * ${FRAME_PADDING}px - (${GRID_COLUMN} - 1) * ${GRID_GAP}px )/${GRID_COLUMN});
height: calc(((100vw - 2 * ${FRAME_PADDING}px - (${GRID_COLUMN} - 1) * ${GRID_GAP}px )/${GRID_COLUMN})*9/16);
border-color: white;
border-style: solid;
border-width: ${({ focused }) => (focused ? '6px' : 0)};
box-sizing: border-box;
border-radius: 7px;
background: linear-gradient(to top, #101322, transparent 40%);
`;

export const AssetTitle = styled.div`
color: white;
font-family: 'Segoe UI';
font-size: 24px;
font-weight: 400;
position: absolute;
max-width: 100%;
padding: 15px;
bottom: 0;
`;

const AssetBadgeSVG = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
`

export const AssetBadge = ({favourite}: any) => {
    return favourite && (
        <AssetBadgeSVG>
            <svg width="15" height="14" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: '10px', right: '10px'}}>
                <path fillRule="evenodd" clipRule="evenodd" d="M9 3C8.33 1.268 6.453 0 4.5 0C1.957 0 0 1.932 0 4.5C0 8.029 3.793 10.758 9 16C14.207 10.758 18 8.029 18 4.5C18 1.932 16.043 0 13.5 0C11.545 0 9.67 1.268 9 3Z" fill="white"/>
            </svg>
            <div style={{borderTop: '50px solid rgba(0,0,0,0.5)', borderLeft : '50px solid transparent'}}></div>
        </AssetBadgeSVG>
    )
}