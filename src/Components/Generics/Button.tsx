import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE, THEME_PRIMARY_DARK, THEME_DARK, THEME_TRANSPARENT, THEME_SECONDARY_DARK, PRIMARY_COLOR, SECONDARY_COLOR } from '../../Constants';

interface ButtonProps {
    label: string; 
    focused?: boolean;
    onFocus?: ({ x, y, height, width, top, left } : any, focusItem: any) => void;
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
                    background-color: ${PRIMARY_COLOR};
                `
            case THEME_TRANSPARENT:
                return `
                    background-color: transparent;
                `
            case THEME_DARK:
            default:
                return `
                    background-color: ${SECONDARY_COLOR};
                `
            case THEME_SECONDARY_DARK:
                return `
                    background-color: ${SECONDARY_COLOR};
                    color: #ddd;
                    filter: brightness(0.8);
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
    flex: 1 0 auto;
  `;

export const Button = ({label, action = () => {}, onEnterPress, children, theme, disableState, onFocus}: ButtonProps) => {
    const { ref, focused, focusSelf } = useFocusable({
        onFocus,
        onEnterPress: () => { focusSelf(); action(); },
        focusable: !disableState
    });

    return (
        <ButtonBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()} theme={theme} disableState={disableState}>
            {children? children : label}
        </ButtonBox>
        );
}