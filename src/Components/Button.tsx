import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE } from '../Constants';

interface ButtonProps {
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    label: string; 
    children?: any;
}

const ButtonBox = styled.div<ButtonProps>`
    min-width: 5rem;
    height: 5rem;
    color: white;
    background-color: #101322;
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    padding: 0.5rem 1rem;
    border-style: solid;
    border-width: ${FOCUS_BORDER_SIZE}rem;
    box-sizing: border-box;
    border-radius: 0.7rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
  `;

export const Button = ({label, action, onEnterPress, children}: ButtonProps) => {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <ButtonBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()}>
            {children? children : label}
        </ButtonBox>
        );
}