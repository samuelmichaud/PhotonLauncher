import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE, THEME_PRIMARY_DARK, THEME_DARK, THEME_TRANSPARENT } from '../Constants';

interface ButtonProps {
    label: string; 
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    theme?: string;
    children?: any;
}

const ButtonBox = styled.div<ButtonProps>`
    min-width: 5rem;
    height: 5rem;
    color: white;
    ${props => {
        switch (props.theme) {
            case THEME_PRIMARY_DARK:
                return `
                    background-color: #3653CC;
                `
            case THEME_TRANSPARENT:
                return `
                    background-color: transparent;
                `
            case THEME_DARK:
            default:
                return `
                    background-color: #2E344B;
                `
        }
    }}
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    box-shadow: 0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'});
    padding: 0.5rem 1rem;
    border-style: solid;
    border-width: ${FOCUS_BORDER_SIZE}rem;
    box-sizing: border-box;
    border-radius: 0.7rem;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    justify-content: center;
    transition: all 0.2s ease-in-out;
  `;

export const Button = ({label, action, onEnterPress, children, theme}: ButtonProps) => {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <ButtonBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()} theme={theme}>
            {children? children : label}
        </ButtonBox>
        );
}