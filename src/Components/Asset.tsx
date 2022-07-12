
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
`;

interface AssetBoxProps {
focused: boolean;
color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
width: 208px;
height: 312px;
background-color: ${({ color }) => color};
border-color: #101322;
border-style: solid;
border-width: ${({ focused }) => (focused ? '6px' : 0)};
box-sizing: border-box;
border-radius: 7px;
`;

const AssetTitle = styled.div`
color: white;
margin-top: 10px;
font-family: 'Segoe UI';
font-size: 24px;
font-weight: 400;
`;

interface AssetProps {
title: string;
color: string;
path: string;
onEnterPress: (props: object, details: KeyPressDetails) => void;
onFocus: (
  layout: FocusableComponentLayout,
  props: object,
  details: FocusDetails
) => void;
}

function AssetRender({ title, color, path, onEnterPress, onFocus }: AssetProps) {
const { ref, focused, focusSelf } = useFocusable({
  onEnterPress,
  onFocus,
  extraProps: {
    title,
    color,
    path
  }
});

return (
  <AssetWrapper ref={ref} onClick={() => {focusSelf()}}>
    <AssetBox color={color} focused={focused} />
    <AssetTitle>{title}</AssetTitle>
  </AssetWrapper>
);
}

export const Asset = AssetRender;