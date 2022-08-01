import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';

interface MenuItemBoxProps {
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    label: string; 
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
    min-width: 50px;
    height: 50px;
    color: white;
    background-color: #101322;
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    padding: 5px 10px;
    border-style: solid;
    border-width: 6px;
    box-sizing: border-box;
    border-radius: 7px;
    margin-left: 20px;
  `;

function MenuItem({label, action, onEnterPress}: MenuItemBoxProps) {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <MenuItemBox ref={ref} focused={focused} onClick={() => action()} label={label}>
            <span>{label}</span>
        </MenuItemBox>
        );
}

interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: end;
    max-height: 80px;
    padding: 0 60px;
    background-color: ${({ hasFocusedChild }) =>
        hasFocusedChild ? 'transparent' : 'transparent'};
  `;

interface MenuProps {
    focusKey: string;
}

function MenuRender({ focusKey: focusKeyParam }: MenuProps) {
    const {
        ref,
        focusSelf,
        hasFocusedChild,
        focusKey,
        // setFocus, -- to set focus manually to some focusKey
        //navigateByDirection // -- to manually navigate by direction
        // pause, -- to pause all navigation events
        // resume, -- to resume all navigation events
        // updateAllLayouts -- to force update all layouts when needed
    } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: null,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true,
        onFocus: () => { },
        onBlur: () => { },
        //extraProps: { foo: 'bar' }
    });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
                <MenuItem label={'Refresh library'} action={() => window.ShadowApi.scanForGames()} />
                <MenuItem label={'X'} action={() => window.ShadowApi.quitApp()}/>
            </MenuWrapper>
        </FocusContext.Provider>
    );
}

export const Menu = MenuRender;