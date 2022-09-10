
import React from 'react';

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
  title: string;
  id: string;
  path: string;
  tgdbID: string;
  background_image: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function AssetRender({ title, id, path, tgdbID, background_image, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      id,
      path,
      tgdbID,
      background_image
    }
  });

  return (
    <AssetWrapper 
        ref={ref} 
        onClick={() => {focusSelf()}} 
        onMouseEnter={() => {focusSelf()}}
        key={id} 
        tgdbID={tgdbID} 
        background_image={background_image}>
      <AssetBox focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

export const Asset = AssetRender;