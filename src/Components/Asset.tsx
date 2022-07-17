
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';

const AssetWrapper = styled.div`
margin-right: 22px;
display: flex;
flex-direction: column;
position: relative;
margin-bottom: 20px;
`;

interface AssetBoxProps {
focused: boolean;
}

const AssetBox = styled.div<AssetBoxProps>`
width: 208px;
height: 312px;
background-color: #101322;
border-color: white;
border-style: solid;
border-width: ${({ focused }) => (focused ? '6px' : 0)};
box-sizing: border-box;
border-radius: 7px;
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
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function AssetRender({ title, id, path, onEnterPress, onFocus }: AssetProps) {
const { ref, focused, focusSelf } = useFocusable({
  onEnterPress,
  onFocus,
  extraProps: {
    title,
    id,
    path
  }
});

return (
  <AssetWrapper ref={ref} onClick={() => {focusSelf()}} key={id}>
    <AssetBox focused={focused} />
    <AssetTitle>{title}</AssetTitle>
  </AssetWrapper>
);
}

export const Asset = AssetRender;