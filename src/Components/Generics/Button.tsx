import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE, THEME_PRIMARY_DARK, THEME_DARK, THEME_TRANSPARENT, THEME_SECONDARY_DARK } from '../../Constants';

interface ButtonProps {
    label: string; 
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    theme?: string;
    children?: any;
    disableState?: boolean;
}

const ButtonBox = styled.div<ButtonProps>`
    min-width: 6rem;
    height: 6rem;
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
            case THEME_SECONDARY_DARK:
                return `
                    background-color: #1f2336;
                    color: #ddd;
                `
        }
    }}
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    box-shadow: 0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'});
    opacity: ${({ disableState }) => (disableState ? '0.4' : '1')};
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
    gap: 1rem;
  `;

export const Button = ({label, action = () => {}, onEnterPress, children, theme, disableState}: ButtonProps) => {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); },
        focusable: !disableState
    });

    return (
        <ButtonBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()} theme={theme} disableState={disableState}>
            {children? children : label}
        </ButtonBox>
        );
}