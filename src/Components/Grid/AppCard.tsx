
import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';
import App from "../../Model/App";
import {AppCardOverlay, AppCardBox, AppCardTitle, AppCardBadge, AppCardBackgroundImage, AppCardFaviconImage} from './AppCardInner'
import { DISABLE_STATE_AFTER_APP_LAUNCH, FRAME_PADDING, GRID_COLUMN, GRID_COLUMN_BIG, GRID_GAP, MAIN_INPUT_MOUSE, ZINDEX_FOCUSED_CARD } from '../../Constants';

import { useSelector } from 'react-redux'

interface AppCardWrapperProps {
  tgdbID: string;
  background_image: string;
  nbColumn: number;
  focused: boolean;
  launchingState: boolean;
}

const AppCardWrapper = styled.div<AppCardWrapperProps>`
    display: flex;
    flex-direction: column;
    position: relative;
    //${ ({tgdbID}) => tgdbID? "background-image: url('https://cdn.thegamesdb.net/images/original/clearlogo/" + tgdbID + "-1.png');": ''}
    border-radius: 0.7rem;
    filter: drop-shadow(0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'}));
    transform: scale(${({ focused }) => (focused ? '1.05' : '1')});
    z-index: ${({ focused }) => (focused ? ZINDEX_FOCUSED_CARD : '1')};
    overflow: hidden;
    width: calc((100% - (${({nbColumn}) => nbColumn} - 1) * ${GRID_GAP}rem )/${({nbColumn}) => nbColumn});
    aspect-ratio: 16/9;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    ${({launchingState}) => launchingState? 'background-blend-mode: luminosity;': ''}

    @media (max-aspect-ratio: 3/2) {
      width: calc((100% - ${GRID_GAP}rem)/2); // 2 rows only for portrait mode
    }

    @media (max-aspect-ratio: 1/1) {
      width: calc((100%)); // 1 rows only for portrait mode
    }

`;


interface AppCardProps {
  app: any;
  onFocus: any;
  scrollingRef: any;
  layoutType: string;
}

export const AppCard = ({ app, onFocus, layoutType }: AppCardProps) => {

  // @ts-ignore
  const { ui } = useSelector((state) => state.globalState);

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
      }, DISABLE_STATE_AFTER_APP_LAUNCH); // 10s throttle between user clics
  }

  const onMouseOver = () => {
    if (ui.mainInput === MAIN_INPUT_MOUSE) {
      focusSelf();
    }
  }

  return (
    <AppCardWrapper 
        ref={ref} 
        onClick={() => {onAppCardPress(app)}} 
        onMouseOver={() => {onMouseOver()}}
        key={app.id}
        tgdbID={app.tgdbID}
        background_image={app.background_image}
        nbColumn={(layoutType == 'big')? GRID_COLUMN_BIG : GRID_COLUMN}
        focused={focused}
        launchingState={launchingState}
        >
      <AppCardBackgroundImage focused={focused} background_image={App.getBackground(app)}/>
      {!App.getBackground(app) && <AppCardFaviconImage icon={app.icon}/> }
      <AppCardOverlay launchingState={launchingState}/>
      <AppCardBox focused={focused} />
      <AppCardBadge favourite={app.favourite} />
      <AppCardTitle>{app.title}</AppCardTitle>
    </AppCardWrapper>
  );
}

