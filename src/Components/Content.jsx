
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

var currentFocusedItem = null;

function ContentRender() {
    const [state, dispatch] = useContext(GlobalState);
  
    const { ref, focusKey } = useFocusable();

    const onFocusCallback = ({ x, y, height, width, top, left }, itemFocused, details) => {

        // since we are inside a function, we can't use a useState hook (need to be at root), so we use a simple var
        currentFocusedItem = itemFocused;

        if (state.config.handleMouse === false) {
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
            dispatch({type: 'SET_APPS', payload: data});
        });
        // When the user move a mouse we want to re-enable mouse support
        const mouseMouveDetection = () => {
            dispatch({type: 'SET_MOUSE_SUPPORT', payload: true});
        }

        const handlekeyUpEvent = (event) => {
            if (event.key === 'f' && currentFocusedItem && currentFocusedItem.id) {
              dispatch({type: 'SET_APP_FAVOURITE', id: currentFocusedItem.id, favourite: !currentFocusedItem.favourite });
            } else if (event.key === 'h'  && currentFocusedItem && currentFocusedItem.id) {
                dispatch({type: 'SET_APP_VISIBILITY', id: currentFocusedItem.id, hidden: !currentFocusedItem.hidden });
            }
          }
      
        document.addEventListener('keyup', handlekeyUpEvent);
        document.addEventListener('mousemove', mouseMouveDetection, {passive: true});
        
        // unmount callback
        return () => {
            document.removeEventListener('mousemove', mouseMouveDetection);
            document.removeEventListener('keyup', handlekeyUpEvent);
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