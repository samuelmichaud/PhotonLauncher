
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentGrid } from './Grid/ContentGrid';
import { Loading } from './Generics/Loading';
import { EmptyLibrary } from './EmptyLibrary';
import { FRAME_PADDING, CONTENT_FOCUS, MAIN_INPUT_KEYBOARD, MAIN_INPUT_GAMEPAD, THEME_TRANSPARENT, NAVHELPER_HEIGHT } from '../Constants';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { setApps, setFocusApp } from '../Store/Reducer';
import App from './../Model/App';
import { Button } from './Generics/Button';

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 2rem ${FRAME_PADDING}rem 10rem ${FRAME_PADDING}rem;
    margin-bottom: ${NAVHELPER_HEIGHT}rem;
`;

export const Content = () => {
    const { t } = useTranslation();
    const [loadingState, setLoadingState] = useState(true);
    const [showHiddenApps, forceShowHiddenApps] = useState(false);
    // @ts-ignore (because of globalState which is not recognized)
    const { apps, ui } = useSelector((state) => state.globalState);
    const dispatch = useDispatch();

    const { ref, focusKey, focusSelf } = useFocusable({
        focusKey: CONTENT_FOCUS,
        // when the focus leave <Content /> (ie for the menu), we need to reset current focus state so we cannot do action while being in the menu
        onBlur: () => {
            dispatch(setFocusApp({currentFocusedApp: null }));
        }
    });

    const onFocusCallback = ({ x, y, height, width, top, left } : any, itemFocused : any) => {
        // save the current focused item for later use (ex: action like favourites, hide, ...)
        dispatch(setFocusApp({currentFocusedApp: itemFocused }));
        // when the AppCard is focused, we want to auto scroll the AppCard into view, however, if the user use her mouse, we don't auto scroll
        if (ui.mainInput === MAIN_INPUT_KEYBOARD || ui.mainInput === MAIN_INPUT_GAMEPAD) {
            ref.current.scrollTo({
                top: top - height,
                behavior: "smooth"
            });
        }
    }
  
    // Fetch games, detect mouse/keyboard events, but only the first time to avoid infinite loop (because changings assets will trigger a render)
    useEffect(() => {
        console.info('useEffect in contentRender');

        window.PhotonApi.loadApps((data: Array<any>) => {
            dispatch(setApps(data));
            setLoadingState(false);
            focusSelf();
        });
    }, [focusSelf]);

    const allAppsNotHidden = apps.filter((item: App) => !item.hidden);
    const featuredApps = allAppsNotHidden.slice(0, 2);
    const allApps = allAppsNotHidden.slice(2);
    const hiddenApps = apps.filter((item: App) => item.hidden);
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper ref={ref}>
                {apps.length > 0?
                    <div>
                        <ContentGrid
                            key={'Carrousel'}
                            apps={featuredApps}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'big'}/>
                        <ContentGrid
                            key={'Installed apps'}
                            apps={allApps}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'normal'} />
                        { hiddenApps.length > 0 
                            && <Button label={t(showHiddenApps? 'ButtonHideHiddenApps' : 'ButtonShowHiddenApps')} 
                                       theme={THEME_TRANSPARENT} action={() => forceShowHiddenApps(!showHiddenApps)}/> }
                        { showHiddenApps && hiddenApps.length > 0 &&
                            <ContentGrid
                                key={'hidden apps'}
                                title={t('TitleContentGridHiddenApps')}
                                apps={hiddenApps}
                                onFocus={onFocusCallback}
                                scrollingRef={ref}
                                layoutType={'normal'} />}
                    </div>
                : (loadingState? 
                    <Loading loadingMessage={t('loadingState')}/> :
                    <EmptyLibrary />)
                }
            </ContentWrapper>
        </FocusContext.Provider>
    );
}