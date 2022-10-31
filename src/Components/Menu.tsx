import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
}  from '@noriginmedia/norigin-spatial-navigation';
import { FRAME_PADDING, MENU_FOCUS, SHOW_POPIN_SETTINGS, THEME_TRANSPARENT } from '../Constants';
import { useDispatch } from 'react-redux';
import { togglePopin } from './../Store/Reducer';
import { Button } from './Generics/Button';
import { MenuIcon } from '../Images/MenuIcon';
import { QuitIcon } from '../Images/QuitIcon';
import { ShadowLogo } from '../Images/ShadowLogo';
import { useTranslation } from "react-i18next";

interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
    position: absolute;
    right: ${FRAME_PADDING}rem;
    top: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: end;
    max-height: 8rem;
    gap: 2rem;
    background-color: ${({ hasFocusedChild }) =>
        hasFocusedChild ? 'transparent' : 'transparent'};
  `;

export const Menu = () => {
    const {
        ref,
        focusSelf,
        hasFocusedChild,
        focusKey,
        // setFocus, -- to set focus manually to some focusKey
        // navigateByDirection // -- to manually navigate by direction
        // pause, -- to pause all navigation events
        // resume, -- to resume all navigation events
        // updateAllLayouts -- to force update all layouts when needed
    } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: MENU_FOCUS,
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

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <FocusContext.Provider value={focusKey}>
            <div style={{position: 'relative', marginTop: '1rem', padding: '0 ' + FRAME_PADDING + 'rem' }}>
                <ShadowLogo />
                <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
                    <Button label={t('MenuSettings')} action={() => dispatch(togglePopin({id: SHOW_POPIN_SETTINGS}))} theme={THEME_TRANSPARENT}>
                        <MenuIcon />
                    </Button>
                    <Button label={t('Quit')} action={() => window.ShadowApi.quitApp()} theme={THEME_TRANSPARENT}>
                        <QuitIcon />
                    </Button>
                </MenuWrapper>
            </div>
            <hr style={{border: 'none', background: '#9ab0ff', width: `calc(100vw - 2 * ${FRAME_PADDING}rem)`, height: '0.1rem'}}/>
        </FocusContext.Provider>
    );
}