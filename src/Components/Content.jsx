
import React, { useCallback, useState, useEffect, useContext } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentGrid } from './ContentGrid';
import { FRAME_PADDING } from '../Constants'
import {GlobalState} from './../Store/Store';

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

    const [state, dispatch] = useContext(GlobalState);
  
    // Fetch games, but only the first time to avoid infinite loop (because changings assets will trigger a render)
    useEffect(() => {
        console.info('useEffect in contentRender');

        window.ShadowApi.fetchApps((data) => {
            dispatch({type: 'SET_APPS', payload: data});
        });
        // When the user move a mouse we want to re-enable mouse support
        function mouseMouveDetection() {
            dispatch({type: 'SET_MOUSE_SUPPORT', payload: true});
        }
        document.addEventListener('mousemove', mouseMouveDetection, {passive: true});
        
        // unmount callback
        return () => {
            document.removeEventListener('mousemove', mouseMouveDetection);
        }
    }, []);
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                <ScrollingRows ref={ref}>
                    <div>
                        <ContentGrid
                            key={'Installed apps'}
                            title={'Installed apps'}
                            assets={state.apps}
                            scrollingRef={ref}
                        />
                    </div>
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export const Content = ContentRender;