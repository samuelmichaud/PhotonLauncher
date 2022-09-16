
import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';

import {AssetOverlay, AssetBox, AssetTitle, AssetBadge} from './AssetInner'
import { FRAME_PADDING, GRID_COLUMN, GRID_COLUMN_BIG, GRID_GAP } from '../Constants';

import { useSelector } from 'react-redux'

interface AssetWrapperProps {
  tgdbID: string;
  background_image: string;
  nbColumn: number;
}

const AssetWrapper = styled.div<AssetWrapperProps>`
display: ${({hidden}) => hidden? 'none' : 'flex'}
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
width: calc((100vw - 2 * ${FRAME_PADDING}px - (${({nbColumn}) => nbColumn} - 1) * ${GRID_GAP}px )/${({nbColumn}) => nbColumn});
height: calc(((100vw - 2 * ${FRAME_PADDING}px - (${({nbColumn}) => nbColumn} - 1) * ${GRID_GAP}px )/${({nbColumn}) => nbColumn})*9/16);
`;


interface AssetProps {
  asset: any;
  onFocus: any;
  scrollingRef: any;
  layoutType: string;
}

function AssetRender({ asset, onFocus, layoutType }: AssetProps) {

  // @ts-ignore
  const { globalState } = useSelector((state) => state);

  const [launchingState, setLaunchingState] = useState(false);
  
  const { ref, focused, focusSelf } = useFocusable({
    onFocus, // callback passed as prop
    onEnterPress: (props: any, details: KeyPressDetails) => {
      onAssetPress(asset);
    },
    extraProps: { ...asset }
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
    // @ts-ignore
    if (globalState.config.handleMouse) {
      focusSelf();
    }
  }

  return (
    <AssetWrapper 
        ref={ref} 
        onClick={() => {onAssetPress(asset)}} 
        onMouseEnter={() => {onMouseEnter()}}
        hidden={asset.hidden}
        key={asset.id}
        tgdbID={asset.tgdbID}
        background_image={asset.background_image}
        nbColumn={(layoutType == 'big')? GRID_COLUMN_BIG : GRID_COLUMN}
        >
      <AssetOverlay launchingState={launchingState}/>
      <AssetBox focused={focused} />
      <AssetBadge favourite={asset.favourite} />
      <AssetTitle>{asset.title}</AssetTitle>
    </AssetWrapper>
  );
}

export const Asset = AssetRender;