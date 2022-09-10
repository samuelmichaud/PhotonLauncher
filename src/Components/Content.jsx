
import React, { useCallback, useState, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentGrid } from './ContentGrid';
import { FRAME_PADDING } from '../Constants';

const ContentWrapper = styled.div`
flex: 1;
overflow: hidden;
display: flex;
flex-direction: column;
padding: 0 ${FRAME_PADDING}px;
`;

const SelectedItemWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
`;

const SelectedItemBox = styled.div`
height: 282px;
width: 100%;
background-color: ${({ color }) => color};
margin-bottom: 37px;
border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
position: absolute;
bottom: 75px;
left: 100px;
color: white;
font-size: 27px;
font-weight: 400;
font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
overflow-y: auto;
overflow-x: hidden;
flex-shrink: 1;
flex-grow: 1;
`;

function ContentRender() {
    const { ref, focusKey } = useFocusable();

    // Fetch games, but only the first time to avoid infinite loop (because changings assets will trigger a render)
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        window.ShadowApi.fetchApps((data) => {
            setAssets(data);
        });
    }, assets);
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                {/*<SelectedItemWrapper>
                        <SelectedItemBox
                            color={selectedAsset ? selectedAsset.color : '#565b6b'}
                        />
                        <SelectedItemTitle>
                        {selectedAsset
                            ? selectedAsset.title
                            : 'Press "Enter" to select an asset'}
                        </SelectedItemTitle>
                    </SelectedItemWrapper> */}
                <ScrollingRows ref={ref}>
                    <div>
                        <ContentGrid
                            key={'Installed apps'}
                            title={'Installed apps'}
                            assets={assets}
                            scrollingRef={ref}
                        />
                    </div>
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export const Content = ContentRender;