
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';


interface AssetWrapperProps {
  tgdbID: string;
}

const AssetWrapper = styled.div<AssetWrapperProps>`
margin-right: 22px;
display: flex;
flex-direction: column;
position: relative;
margin-bottom: 20px;
background-image: url('https://cdn.thegamesdb.net/images/thumb/boxart/front/${ ({tgdbID}) => tgdbID}-1.jpg');
background-size: contain;
background-color: #101322;
background-position: center;
background-repeat: no-repeat;
border-radius: 7px;
`;

interface AssetBoxProps {
  focused: boolean;
}

const AssetBox = styled.div<AssetBoxProps>`
width: 234px;
height: 312px;
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
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function AssetRender({ title, id, path, tgdbID, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      id,
      path,
      tgdbID
    }
  });

  return (
    <AssetWrapper ref={ref} onClick={() => {focusSelf()}} key={id} tgdbID={tgdbID}>
      <AssetBox focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

export const Asset = AssetRender;