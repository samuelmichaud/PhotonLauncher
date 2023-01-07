
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { Loading } from '../Generics/Loading';
import { FOCUS_BORDER_SIZE } from './../../Constants';
import { HeartIcon } from '../../Images/HeartIcon';

// @ts-ignore
import defaultBackgroundImage from '../../Images/default_background.jpg';

interface AppCardOverlayProps {
    launchingState: boolean;
}

export const AppCardOverlay = styled(({ className, children, launchingState }) => (
    <div className={className}>
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
    position: absolute;
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    border: white solid ${({ focused }) => (focused ? FOCUS_BORDER_SIZE + 'rem' : '0')};
    border-radius: 0.7rem;
    background: linear-gradient(to top, #101322, transparent 40%);
`;

interface AppCardBackgroundImageProps {
    focused: boolean;
    background_image: string;
}

export const AppCardBackgroundImage = styled.div<AppCardBackgroundImageProps>`
    height: 100%;
    width: 100%; 
    position: absolute;
    background-size: cover;
    background-color: #101322;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(${({ focused }) => (focused ? '1.05' : '1.00')});
    background-image: url('${ ({background_image}) => background_image? background_image : defaultBackgroundImage}');
    transition: all 0.5s;
`

interface AppCardFaviconImageProps {
    icon: string;
}

export const AppCardFaviconImage = styled.div<AppCardFaviconImageProps>`
    height: 100%;
    width: 100%; 
    position: absolute;
    background-image: url('${({ icon }) => (icon)}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10rem;
    transition: all 0.5s;
`

export const AppCardTitle = styled.div`
    color: white;
    font-family: 'Segoe UI';
    font-size: 2.6rem;
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
            <div style={{position: 'absolute', top: '1rem', right: '1rem'}}><HeartIcon /></div>
            <div style={{borderTop: '5rem solid rgba(0,0,0,0.5)', borderLeft : '5rem solid transparent'}}></div>
        </AppCardBadgeSVG>
    )
}