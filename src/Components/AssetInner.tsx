
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
