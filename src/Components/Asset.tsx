
import React, { useCallback, useState, useContext } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';

import {AssetOverlay, AssetBox, AssetTitle} from './AssetInner'
import {GlobalState} from '../Store/Store'

interface AssetWrapperProps {
  tgdbID: string;
  background_image: string;
}

const AssetWrapper = styled.div<AssetWrapperProps>`
display: flex;
flex-direction: column;
position: relative;
//background-image: url('https://cdn.thegamesdb.net/images/thumb/boxart/front/${ ({tgdbID}) => tgdbID}-1.jpg');
background-image: url('${ ({background_image}) => background_image}');
background-size: cover;
background-color: #101322;
background-position: center;
background-repeat: no-repeat;
border-radius: 7px;
overflow: hidden;
`;


interface AssetProps {
  asset: any;
  scrollingRef: any;
}

function AssetRender({ asset, scrollingRef }: AssetProps) {

  //@ts-ignore
  const [state, dispatch] = useContext(GlobalState);

  const [launchingState, setLaunchingState] = useState(false);
  
  const { ref, focused, focusSelf } = useFocusable({
    onFocus: ({ x, y, height, width, top, left }) => {
      if (state.config.handleMouse === false) {
        scrollingRef.current.scrollTo({
          top: top - height,
          behavior: "smooth"
      });
      }
    },
    onArrowPress: (direction: string, keysDetails: KeyPressDetails) => {
      dispatch({type: 'SET_MOUSE_SUPPORT', payload: false});
      return true;
    },
    onEnterPress: (props: any, details: KeyPressDetails) => {
      onAssetPress(asset);
    }
  });

  const onAssetPress = (asset: any) => {

    // we don't want user be able to clic multiple times because she thinks that the app isn't launching
    if (launchingState) {
      window.ShadowApi.launchExternalApp(asset.launch);
    }
    setLaunchingState(true);
      focusSelf();
      setTimeout(() => {
        setLaunchingState(false);
      }, 10000); // 10s throttle between user clics
  }

  const onMouseEnter = () => {
    if (state.config.handleMouse) {
      focusSelf();
    }
  }

  return (
    <AssetWrapper 
        ref={ref} 
        onClick={() => {onAssetPress(asset)}} 
        onMouseEnter={() => {onMouseEnter()}}
        key={asset.id}
        tgdbID={asset.tgdbID}
        background_image={asset.background_image}>
      <AssetOverlay launchingState={launchingState}/>
      <AssetBox focused={focused}/>
      <AssetTitle>{asset.title}</AssetTitle>
    </AssetWrapper>
  );
}

export const Asset = AssetRender;