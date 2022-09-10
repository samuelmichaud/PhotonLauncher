
import React, { useCallback, useState, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';
import { FRAME_PADDING, GRID_COLUMN, GRID_GAP } from '../Constants';


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
`;

interface AssetBoxProps {
  focused: boolean;
}

const AssetBox = styled.div<AssetBoxProps>`
width: calc((100vw - 2 * ${FRAME_PADDING}px - (${GRID_COLUMN} - 1) * ${GRID_GAP}px )/${GRID_COLUMN});
height: calc(((100vw - 2 * ${FRAME_PADDING}px - (${GRID_COLUMN} - 1) * ${GRID_GAP}px )/${GRID_COLUMN})*9/16);
border-color: white;
border-style: solid;
border-width: ${({ focused }) => (focused ? '6px' : 0)};
box-sizing: border-box;
border-radius: 7px;
background: linear-gradient(to top, #101322, transparent 40%);
`;

const AssetTitle = styled.div`
color: white;
font-family: 'Segoe UI';
font-size: 24px;
font-weight: 400;
position: absolute;
max-width: 100%;
padding: 15px;
bottom: 0;
`;

interface AssetProps {
  asset: any;
  scrollingRef: any;
  /*onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;*/
}

function AssetRender({ asset, scrollingRef }: AssetProps) {

  const [shouldHandleMouse, setMouseSupport] = useState(false);
  
  document.addEventListener('mousemove', () => {
    setMouseSupport(true);
  });

  const { ref, focused, focusSelf } = useFocusable({
    onFocus: ({ x, y, height, width, top, left }) => {
      if (shouldHandleMouse === false) {
        scrollingRef.current.scrollTo({
          top: top - height,
          behavior: "smooth"
      });
      }
    },
    onArrowPress: (direction: string, keysDetails: KeyPressDetails) => {
      setMouseSupport(false);
      return true;
    },
    onEnterPress: (props: any, details: KeyPressDetails) => {
      onAssetPress(asset);
    }
  });

  const onAssetPress = (asset: any) => {
      window.ShadowApi.launchExternalApp(asset.launch);
      focusSelf();
  }

  const onMouseEnter = () => {
    if (shouldHandleMouse) {
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
      <AssetBox focused={focused} />
      <AssetTitle>{asset.title}</AssetTitle>
    </AssetWrapper>
  );
}

export const Asset = AssetRender;