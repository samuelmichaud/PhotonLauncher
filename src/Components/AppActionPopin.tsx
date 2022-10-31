import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAppFavourite, setAppVisibility, togglePopin } from '../Store/Reducer';
import { Popin } from './Generics/Popin';
import { Button } from './Generics/Button';
import { CONTENT_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_MEDIUM, THEME_DARK, POPIN_SIZE_LARGE, THEME_SECONDARY_DARK } from '../Constants';
import { useTranslation } from "react-i18next";
import App from '../Model/App';
import { HorizontalSeparator } from './Generics/HorizontalSeparator';
import { HeartIcon } from '../Images/HeartIcon';
import { EyeIcon } from '../Images/EyeIcon';

const InnerAppActionPopin = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
`

const AppActionPopinContent = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 1rem;
`

interface AppActionPopinProps {
    app: App;
}

export const AppActionPopin = ({app}: AppActionPopinProps) => {
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onPopinClose = () => {
        setFocus(CONTENT_FOCUS); 
        dispatch(togglePopin({id: SHOW_POPIN_NONE}));
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={app.title} size={POPIN_SIZE_LARGE} closeAction={() => onPopinClose()}>
                <InnerAppActionPopin ref={ref}>
                    <AppActionPopinContent>
                        <Button label={t('AppActionLaunchButton')} action={() => window.ShadowApi.launchExternalApp(app.launch)} />
                        <Button label={t(app.favourite? 'AppActionAddToFavouriteButton': 'AppActionRemoveFromFavouriteButton')} 
                                action={() => dispatch(setAppFavourite({id: app.id, favourite: !app.favourite}))}>
                            <HeartIcon filled={app.favourite}/>
                            {app.favourite? 
                                t('AppActionRemoveFromFavouriteButton'): 
                                t('AppActionAddToFavouriteButton')}
                        </Button>
                        <Button label={t(app.hidden? 'AppActionShowButton': 'AppActionHideButton')} theme={THEME_SECONDARY_DARK} 
                                action={() => dispatch(setAppVisibility({id: app.id, hidden: !app.hidden }))}>
                            <EyeIcon open={!app.hidden}/>
                            {app.hidden? 
                                t('AppActionShowButton'): 
                                t('AppActionHideButton')}
                        </Button>
                    </AppActionPopinContent>
                    <HorizontalSeparator />
                    <Button label={t('AppActionPopinCloseButton')} action={() => { onPopinClose(); }} theme={THEME_DARK}></Button>
                </InnerAppActionPopin>
            </Popin>
        </FocusContext.Provider>
    )
}