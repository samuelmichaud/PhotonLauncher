import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch } from 'react-redux';
import { toggleSettingsPopin } from './../Store/Reducer';
import { Popin } from './Popin';
import { Button } from './Button';
import { MENU_FOCUS, POPIN_SIZE_MEDIUM, THEME_DARK, THEME_PRIMARY_DARK } from './../Constants';

const InnerSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
`

export const Settings = () => {
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onSettingsClose = () => {
        setFocus(MENU_FOCUS); dispatch(toggleSettingsPopin(false));
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={'Settings'} size={POPIN_SIZE_MEDIUM}>
                <InnerSettings ref={ref} >
                    <Button label={'Refresh library'} action={() => { onSettingsClose(); window.ShadowApi.scanForGames()}} theme={THEME_DARK}>
                        <svg width="1.6rem" height="1.6rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '0.5rem'}}>
                            <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C11.7 16 14.8 13.4 16 10H14C12.8 12.3 10.6 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C9.7 2 11.1 2.7 12 4L9 7H16V0L14 2C12.2 1 10.2 0 8 0Z" fill="white"/>
                        </svg>
                        <span>{'Refresh library'}</span>
                    </Button>
                    <Button label={'Save and close'} action={() => { onSettingsClose(); }} theme={THEME_PRIMARY_DARK}></Button>
                </InnerSettings>
            </Popin>
        </FocusContext.Provider>
    )
}