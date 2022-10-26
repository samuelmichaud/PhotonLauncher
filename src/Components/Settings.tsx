import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch } from 'react-redux';
import { togglePopin, setLanguage, setLaunchOption, addApp } from './../Store/Reducer';
import { Popin } from './Generics/Popin';
import { Button } from './Generics/Button';
import { MENU_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_MEDIUM, THEME_DARK, THEME_PRIMARY_DARK, LANG_LIST_OPTIONS, LAUNCH_OPTION_STARTUP, LAUNCH_OPTION_NONE, MAIN_INPUT_MOUSE } from './../Constants';
import { useTranslation } from "react-i18next";
import { OptionSelector } from './Generics/OptionSelector';
import { FileSelector } from './Generics/FileSelector';
import { cp } from 'original-fs';

const InnerSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
`

export const Settings = () => {
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onSettingsClose = () => {
        setFocus(MENU_FOCUS); dispatch(togglePopin(SHOW_POPIN_NONE));
    }

    const launchSettings = [
        { displayName: t('SettingsLaunchStartup'), value: LAUNCH_OPTION_STARTUP},
        { displayName: t('SettingsLaunchNone'), value: LAUNCH_OPTION_NONE},
    ]

    const onFileSelectorChange = (event: any) => {
        const file = event.target.files[0]
        const appName = file.name.substring(0, file.name.lastIndexOf("."));
        dispatch(addApp({id: file.path, title: appName, path: file.path}));
        onSettingsClose();
        console.log(file);
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={t('SettingsPopinTitle')} size={POPIN_SIZE_MEDIUM}>
                <InnerSettings ref={ref} >
                    <Button label={t('SettingsPopinRefreshButton')} action={() => { onSettingsClose(); window.ShadowApi.scanForGames()}} theme={THEME_DARK}>
                        <svg width="1.6rem" height="1.6rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '0.5rem'}}>
                            <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C11.7 16 14.8 13.4 16 10H14C12.8 12.3 10.6 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C9.7 2 11.1 2.7 12 4L9 7H16V0L14 2C12.2 1 10.2 0 8 0Z" fill="white"/>
                        </svg>
                        <span>{t('SettingsPopinRefreshButton')}</span>
                    </Button>
                    <FileSelector label={t('SettingsAddCustomAppLabel')} onChangeAction={(event) => onFileSelectorChange(event)}></FileSelector>

                    <hr style={{border: 'none', background: '#9ab0ff', width: '100%', height: '0.1rem'}}/>
                    <OptionSelector 
                        label={t('SettingsLanguageLabel')} 
                        options={LANG_LIST_OPTIONS} 
                        getCurrentOption={(lang) => dispatch(setLanguage(lang))} />
                    <OptionSelector 
                        label={t('SettingsLaunchLabel')} 
                        options={launchSettings} 
                        getCurrentOption={(option) => {window.ShadowApi.updateStartupMode(option); dispatch(setLaunchOption(option))}} />
                    <hr style={{border: 'none', background: '#9ab0ff', width: '100%', height: '0.1rem'}}/>

                    <Button label={t('SettingsPopinCloseButton')} action={() => { onSettingsClose(); }} theme={THEME_PRIMARY_DARK}></Button>
                </InnerSettings>
            </Popin>
        </FocusContext.Provider>
    )
}