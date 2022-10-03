
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { Loading } from './../Components/Loading';
import { FOCUS_BORDER_SIZE } from './../Constants';

interface AppCardOverlayProps {
    launchingState: boolean;
}

export const AppCardOverlay = styled(({ className, children, launchingState }) => (
    <div>
        {launchingState? <Loading /> : ''}
    </div>
  ))<AppCardOverlayProps>`
background: rgba(0, 0, 0, 50%);
top: 0;
bottom: 0;
left: 0;
right: 0;
opacity: ${({ launchingState }) => (launchingState ? '1' : '0')};
position: absolute;
transition: all 0.2s;
`
interface AppCardBoxProps {
    focused: boolean;
}

export const AppCardBox = styled.div<AppCardBoxProps>`
height: 100%;
width: 100%;
border-color: white;
border-style: solid;
box-sizing: border-box;
border: white solid ${({ focused }) => (focused ? FOCUS_BORDER_SIZE + 'rem' : '0')};
border-radius: 0.7rem;
background: linear-gradient(to top, #101322, transparent 40%);
`;

export const AppCardTitle = styled.div`
color: white;
font-family: 'Segoe UI';
font-size: 2.4rem;
font-weight: 400;
position: absolute;
max-width: 100%;
padding: 1.5rem;
bottom: 0;
`;

const AppCardBadgeSVG = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`

export const AppCardBadge = ({favourite}: any) => {
    return favourite && (
        <AppCardBadgeSVG>
            <svg width="1.5rem" height="1.4rem" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: '1rem', right: '1rem'}}>
                <path fillRule="evenodd" clipRule="evenodd" d="M9 3C8.33 1.268 6.453 0 4.5 0C1.957 0 0 1.932 0 4.5C0 8.029 3.793 10.758 9 16C14.207 10.758 18 8.029 18 4.5C18 1.932 16.043 0 13.5 0C11.545 0 9.67 1.268 9 3Z" fill="white"/>
            </svg>
            <div style={{borderTop: '5rem solid rgba(0,0,0,0.5)', borderLeft : '5rem solid transparent'}}></div>
        </AppCardBadgeSVG>
    )
}