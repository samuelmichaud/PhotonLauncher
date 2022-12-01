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
import { CONTENT_FOCUS, SHOW_POPIN_NONE, THEME_DARK, POPIN_SIZE_LARGE, THEME_SECONDARY_DARK, FRAME_PADDING, POPIN_BG_COLOR } from '../Constants';
import { useTranslation } from "react-i18next";
import App from '../Model/App';
import { HeartIcon } from '../Images/HeartIcon';
import { EyeIcon } from '../Images/EyeIcon';
// @ts-ignore
import defaultBackgroundImage from '../Images/default_background.jpg';

const InnerAppPopin = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
`

const AppPopinContent = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    gap: 1rem;
    justify-content: space-between;
    & > div {
        flex: 1;
    }
`

const AppPopinHeaderWrapper = styled.div`
    position: relative;
    min-height: 30rem;
    height: 40vh;
    margin: 0 -${FRAME_PADDING}rem;
`

interface AppPopinBackgroundImageProps {
    background_image: string;
}

export const AppPopinBackgroundImage = styled.div<AppPopinBackgroundImageProps>`
    height: 100%;
    width: 100%; 
    position: absolute;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-image: url('${ ({background_image}) => background_image? background_image : defaultBackgroundImage}');
    transition: all 0.5s;
`

export const AppPopinTitle = styled.div`
    color: white;
    font-family: 'Segoe UI';
    font-size: 3.5rem;
    font-weight: 600;
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    padding: 1.5rem;
    bottom: 0;
    background: linear-gradient(0deg, ${POPIN_BG_COLOR}, transparent);
`;

export const AppPopinCredit = styled.div`
    position: absolute;
    right: ${FRAME_PADDING}rem;
    bottom: 0;
    color: white;
    font-size: 1.2rem;
    & a {
        color: white;
    }
`

interface AppPopinProps {
    app: App;
}

export const AppActionPopin = ({app}: AppPopinProps) => {
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
            <Popin size={POPIN_SIZE_LARGE} closeAction={() => onPopinClose()}
                children={
                    <InnerAppPopin ref={ref}>
                        <AppPopinHeaderWrapper>
                            <AppPopinBackgroundImage background_image={app.background_image}/>
                            <AppPopinTitle>{app.title}</AppPopinTitle>
                            {app.rawgSlug && <AppPopinCredit>{t('AppActionPopinCredit')} <a href={'https://rawg.io/games/' + app.rawgSlug} target="_blank">RAWG.io</a></AppPopinCredit>}
                        </AppPopinHeaderWrapper>
                        <AppPopinContent>
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
                        </AppPopinContent>
                    </InnerAppPopin>}
                footer={
                    <Button label={t('AppActionPopinCloseButton')} action={() => { onPopinClose(); }} theme={THEME_DARK}></Button>
                }
            />
        </FocusContext.Provider>
    )
}