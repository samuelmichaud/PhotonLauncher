
import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentGrid } from './ContentGrid';
import { FRAME_PADDING } from '../Constants'

import { useSelector, useDispatch } from 'react-redux'
import { setApps, setFocusApp } from './../Store/Reducer'

const ContentWrapper = styled.div`
flex: 1;
overflow: hidden;
display: flex;
flex-direction: column;
padding: 0 ${FRAME_PADDING}px;
`;

const ScrollingRows = styled.div`
overflow-y: auto;
overflow-x: hidden;
flex-shrink: 1;
flex-grow: 1;
`;

function ContentRender() {
      
    const { ref, focusKey } = useFocusable();
    const { globalState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onFocusCallback = ({ x, y, height, width, top, left }, itemFocused, details) => {

        dispatch(setFocusApp({currentFocusedApp: itemFocused }));

        if (globalState.config.handleMouse === false) {
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
        });
    }, []);
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                <ScrollingRows ref={ref}>
                    <div>
                        <ContentGrid
                            key={'Installed apps'}
                            title={'Installed apps'}
                            assets={globalState.apps}
                            onFocus={onFocusCallback}
                            scrollingRef={ref}
                        />
                    </div>
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export const Content = ContentRender;