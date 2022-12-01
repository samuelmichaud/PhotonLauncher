import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { findIndex } from 'underscore';
import { togglePopin, setLanguage, setLaunchOption } from './../Store/Reducer';
import { Popin } from './Generics/Popin';
import { Button } from './Generics/Button';
import { MENU_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_MEDIUM, THEME_DARK, THEME_PRIMARY_DARK, LANG_LIST_OPTIONS, LAUNCH_OPTION_STARTUP, LAUNCH_OPTION_NONE, MAIN_INPUT_MOUSE, MAIN_INPUT_KEYBOARD, MAIN_INPUT_GAMEPAD } from './../Constants';
import { useTranslation } from "react-i18next";
import { OptionSelector } from './Generics/OptionSelector';
import { HorizontalSeparator } from './Generics/HorizontalSeparator';
import { AddCustomAppButton } from './AddCustomAppButton';

const InnerSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
    overflow-y: auto;
    position: relative;
`

export const Settings = () => {
    // @ts-ignore (because of globalState which is not recognized)
    const { ui } = useSelector((state) => state.globalState);
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // @ts-ignore (because of globalState which is not recognized)
    const { config } = useSelector((state) => state.globalState);

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onSettingsClose = () => {
        setFocus(MENU_FOCUS); dispatch(togglePopin({id: SHOW_POPIN_NONE}));
    }

    const onFocusCallback = ({ x, y, height, width, top, left } : any, focusItem: any) => {
        if (ui.mainInput === MAIN_INPUT_KEYBOARD || ui.mainInput === MAIN_INPUT_GAMEPAD) {
            let scroll = (y - height < 0)? 0 : y - height;
            ref.current.scrollTo({
                top: scroll,
                behavior: "smooth"
            });
        }
    }

    const launchSettings = [
        { displayName: t('SettingsLaunchStartup'), value: LAUNCH_OPTION_STARTUP},
        { displayName: t('SettingsLaunchNone'), value: LAUNCH_OPTION_NONE},
    ]

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={t('SettingsPopinTitle')} size={POPIN_SIZE_MEDIUM} closeAction={() => onSettingsClose()}
                children={
                    <InnerSettings ref={ref} >
                        <Button label={t('SettingsPopinRefreshButton')} action={() => { onSettingsClose(); window.ShadowApi.scanForGames()}} theme={THEME_DARK} onFocus={onFocusCallback}>
                            <svg width="1.6rem" height="1.6rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C11.7 16 14.8 13.4 16 10H14C12.8 12.3 10.6 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C9.7 2 11.1 2.7 12 4L9 7H16V0L14 2C12.2 1 10.2 0 8 0Z" fill="white"/>
                            </svg>
                            <span>{t('SettingsPopinRefreshButton')}</span>
                        </Button>
                        <AddCustomAppButton />

                        <HorizontalSeparator />
                        <OptionSelector 
                            label={t('SettingsLanguageLabel')} 
                            options={LANG_LIST_OPTIONS}
                            initialOption={findIndex(LANG_LIST_OPTIONS, (item: any) => item.value === config.lang.value)}
                            getCurrentOption={(lang) => dispatch(setLanguage(lang))} 
                            onFocus={onFocusCallback}
                            />
                        <OptionSelector 
                            label={t('SettingsLaunchLabel')} 
                            options={launchSettings}
                            initialOption={findIndex(launchSettings, (item: any) => item.value === config.launchOption.value)}
                            getCurrentOption={(option) => {window.ShadowApi.updateStartupMode(option); dispatch(setLaunchOption(option))}} 
                            onFocus={onFocusCallback}
                            />
                    </InnerSettings>
                }
                footer={
                    <Button label={t('SettingsPopinCloseButton')} action={() => { onSettingsClose(); }} theme={THEME_PRIMARY_DARK}></Button>
                }
            />
        </FocusContext.Provider>
    )
}