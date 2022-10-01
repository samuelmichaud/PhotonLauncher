
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
import { FRAME_PADDING } from '../Constants'

import { useSelector, useDispatch } from 'react-redux'
import { setApps, setFocusApp } from './../Store/Reducer'

const ContentWrapper = styled.div`
flex: 1;
overflow-y: auto;
display: flex;
flex-direction: column;
padding: 2rem ${FRAME_PADDING}rem;
`;

function ContentRender() {
    
    const [loadingState, setLoadingState] = useState(true);
    const { apps, config } = useSelector((state) => state.globalState);
    const dispatch = useDispatch();

    const { ref, focusKey, focusSelf } = useFocusable({
        // when the focus leave <Content /> (ie for the menu), we need to reset current focus state so we cannot do action while being in the menu
        onBlur: () => {
            dispatch(setFocusApp({currentFocusedApp: null }));
        }
    });

    const onFocusCallback = ({ x, y, height, width, top, left }, itemFocused, details) => {

        dispatch(setFocusApp({currentFocusedApp: itemFocused }));

        if (config.handleMouse === false) {
            ref.current.scrollTo({
                top: top - height,
                behavior: "smooth"
            });
        }
    }
  
    // Fetch games, detect mouse/keyboard events, but only the first time to avoid infinite loop (because changings assets will trigger a render)
    useEffect(() => {
        console.info('useEffect in contentRender');

        window.ShadowApi.fetchApps((data) => {
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
                            assets={apps.slice(0, 2)}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'big'}/>
                        <ContentGrid
                            key={'Installed apps'}
                            assets={apps.slice(2)}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                            layoutType={'normal'} />
                    </div>
                : (loadingState? 
                    <Loading /> :
                    <EmptyLibrary />)
                }
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export const Content = ContentRender;