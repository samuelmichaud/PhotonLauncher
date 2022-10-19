
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentGrid } from './ContentGrid';
import { Loading } from './Loading';
import { EmptyLibrary } from './EmptyLibrary';
import { FRAME_PADDING, CONTENT_FOCUS, MAIN_INPUT_KEYBOARD, MAIN_INPUT_GAMEPAD } from '../Constants';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import { setApps, setFocusApp } from '../Store/Reducer'

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 2rem ${FRAME_PADDING}rem;
`;

export const Content = () => {
    const { t } = useTranslation();
    const [loadingState, setLoadingState] = useState(true);
    // @ts-ignore (because of globalState which is not recognized)
    const { apps, config } = useSelector((state) => state.globalState);
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
        if (config.mainInput === MAIN_INPUT_KEYBOARD || config.mainInput === MAIN_INPUT_GAMEPAD) {
            ref.current.scrollTo({
                top: top - height,
                behavior: "smooth"
            });
        }
    }
  
    // Fetch games, detect mouse/keyboard events, but only the first time to avoid infinite loop (because changings assets will trigger a render)
    useEffect(() => {
        console.info('useEffect in contentRender');

        window.ShadowApi.fetchApps((data: Array<any>) => {
            dispatch(setApps(data));
            setLoadingState(false);
            focusSelf();
        });
    }, [focusSelf]);
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper ref={ref}>
                {apps.length > 0?
                    <div>
                        <ContentGrid
                            key={'Carrousel'}
                            apps={apps.slice(0, 2)}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'big'}/>
                        <ContentGrid
                            key={'Installed apps'}
                            apps={apps.slice(2)}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'normal'} />
                    </div>
                : (loadingState? 
                    <Loading loadingMessage={t('loadingState')}/> :
                    <EmptyLibrary />)
                }
            </ContentWrapper>
        </FocusContext.Provider>
    );
}