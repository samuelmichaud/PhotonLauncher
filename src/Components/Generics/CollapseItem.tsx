import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE } from '../../Constants';

interface CollapseItemProps {
    label: string; 
    onFocus?: ({ x, y, height, width, top, left } : any, focusItem: any) => void;
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    children?: any;
}

const CollapseItemBox = styled.div<CollapseItemProps>`
    min-width: 6rem;
    color: white;
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    box-shadow: 0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'});
    padding: 0.5rem 1rem;
    border-style: solid;
    border-width: ${FOCUS_BORDER_SIZE}rem;
    box-sizing: border-box;
    border-radius: 0.7rem;
    display: flex;
    align-items: left;
    font-size: 1.8rem;
    justify-content: left;
    flex-direction: column;
    transition: all 0.2s ease-in-out;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0;

    & h2 {
        font-size: 2rem;
    }
  `;

interface ToggledItemProps {
    open: boolean;
}

const ToggledItem = styled.div<ToggledItemProps>`
    display: ${({open}) => (open)? 'block': 'none'}
`

export const CollapseItem = ({label, action = () => {}, onEnterPress, children, onFocus}: CollapseItemProps) => {

    const [openState, setOpenState] = useState(false);

    const { ref, focused, focusSelf } = useFocusable({
        onFocus,
        onEnterPress: () => { action(); focusSelf(); }
    });

    action = () => {
        setOpenState(!openState);
    }

    return (
        <CollapseItemBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()}>
            <h2>{label}</h2>
            <ToggledItem open={openState}>
                {children}
            </ToggledItem>
        </CollapseItemBox>
        );
}