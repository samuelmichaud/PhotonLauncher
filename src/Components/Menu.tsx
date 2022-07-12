import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext,
}  from '@noriginmedia/norigin-spatial-navigation';

interface MenuItemBoxProps {
    focused: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 50px;
    height: 50px;
    background-color: #101322;
    border-color: white;
    border-style: solid;
    border-width: ${({ focused }) => (focused ? '6px' : 0)};
    box-sizing: border-box;
    border-radius: 7px;
    margin-left: 20px;
  `;

function MenuItem() {
    const { ref, focused, focusSelf } = useFocusable();

    return <MenuItemBox ref={ref} focused={focused} onClick={() => { focusSelf() }} />;
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
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </MenuWrapper>
        </FocusContext.Provider>
    );
}

export const Menu = MenuRender;