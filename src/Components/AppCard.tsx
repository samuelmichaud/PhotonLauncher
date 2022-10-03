
import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';

import {AppCardOverlay, AppCardBox, AppCardTitle, AppCardBadge} from './AppCardInner'
import { FRAME_PADDING, GRID_COLUMN, GRID_COLUMN_BIG, GRID_GAP } from '../Constants';

import { useSelector } from 'react-redux'

interface AppCardWrapperProps {
  tgdbID: string;
  background_image: string;
  nbColumn: number;
  focused: boolean;
  launchingState: boolean;
}

const AppCardWrapper = styled.div<AppCardWrapperProps>`
    display: ${({hidden}) => hidden? 'none' : 'flex'};
    flex-direction: column;
    position: relative;
    //background-image: url('https://cdn.thegamesdb.net/images/thumb/boxart/front/${ ({tgdbID}) => tgdbID}-1.jpg');
    background-image: url('${ ({background_image}) => background_image}');
    background-size: cover;
    background-color: #101322;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.7rem;
    filter: drop-shadow(0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'}));
    transform: scale(${({ focused }) => (focused ? '1.05' : '1')});
    z-index: ${({ focused }) => (focused ? '99' : '1')};
    overflow: hidden;
    width: calc((100vw - 2 * ${FRAME_PADDING}rem - (${({nbColumn}) => nbColumn} - 1) * ${GRID_GAP}rem )/${({nbColumn}) => nbColumn});
    height: calc(((100vw - 2 * ${FRAME_PADDING}rem - (${({nbColumn}) => nbColumn} - 1) * ${GRID_GAP}rem )/${({nbColumn}) => nbColumn})*9/16);
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    ${({launchingState}) => launchingState? 'background-blend-mode: luminosity;': ''}
`;


interface AppCardProps {
  app: any;
  onFocus: any;
  scrollingRef: any;
  layoutType: string;
}

export const AppCard = ({ app, onFocus, layoutType }: AppCardProps) => {

  // @ts-ignore
  const { globalState } = useSelector((state) => state);

  const [launchingState, setLaunchingState] = useState(false);
  
  const { ref, focused, focusSelf } = useFocusable({
    onFocus, // callback passed as prop
    onEnterPress: (props: any, details: KeyPressDetails) => {
      onAppCardPress(app);
    },
    extraProps: { ...app }
  });

  const onAppCardPress = (app: any) => {

    // we don't want user be able to clic multiple times because she thinks that the app isn't launching
    if (!launchingState) {
      window.ShadowApi.launchExternalApp(app.launch);
    }
    setLaunchingState(true);
      focusSelf();
      setTimeout(() => {
        setLaunchingState(false);
      }, 10000); // 10s throttle between user clics
  }

  const onMouseEnter = () => {
    // @ts-ignore
    if (globalState.config.handleMouse) {
      focusSelf();
    }
  }

  return (
    <AppCardWrapper 
        ref={ref} 
        onClick={() => {onAppCardPress(app)}} 
        onMouseEnter={() => {onMouseEnter()}}
        hidden={app.hidden}
        key={app.id}
        tgdbID={app.tgdbID}
        background_image={app.background_image}
        nbColumn={(layoutType == 'big')? GRID_COLUMN_BIG : GRID_COLUMN}
        focused={focused}
        launchingState={launchingState}
        >
      <AppCardOverlay launchingState={launchingState}/>
      <AppCardBox focused={focused} />
      <AppCardBadge favourite={app.favourite} />
      <AppCardTitle>{app.title}</AppCardTitle>
    </AppCardWrapper>
  );
}

