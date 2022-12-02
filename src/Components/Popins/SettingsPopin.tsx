import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { findIndex } from 'underscore';
import { togglePopin, setLanguage, setLaunchOption } from '../../Store/Reducer';
import { Popin } from '../Generics/Popin';
import { Button } from '../Generics/Button';
import { MENU_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_MEDIUM, THEME_DARK, THEME_PRIMARY_DARK, LANG_LIST_OPTIONS, LAUNCH_OPTION_STARTUP, LAUNCH_OPTION_NONE, MAIN_INPUT_MOUSE, MAIN_INPUT_KEYBOARD, MAIN_INPUT_GAMEPAD } from '../../Constants';
import { useTranslation } from "react-i18next";
import { OptionSelector } from '../Generics/OptionSelector';
import { HorizontalSeparator } from '../Generics/HorizontalSeparator';
import { AddCustomAppButton } from '../AddCustomAppButton';
import { RefreshIcon } from '../../Images/RefreshIcon';

const InnerSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
    overflow-y: auto;
    position: relative;
`

export const SettingsPopin = () => {
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
                            <RefreshIcon />
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