
import React, { useCallback, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { ContentRow } from './ContentRow';
import { rows } from './Data';

const ContentWrapper = styled.div`
flex: 1;
overflow: hidden;
display: flex;
flex-direction: column;
`;

const SelectedItemWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
padding: 0 60px;
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

    const [selectedAsset, setSelectedAsset] = useState(null);

    const onAssetPress = useCallback((asset) => {
        window.ShadowLauncherApi.launchExternalApp(asset.path);
        setSelectedAsset(asset);
    }, []);

    const onRowFocus = useCallback(
        ({ y }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        },
        [ref]
    );

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
                        {rows.map(({ title }) => (
                            <ContentRow
                                key={title}
                                title={title}
                                onAssetPress={onAssetPress}
                                onFocus={onRowFocus}
                            />
                        ))}
                    </div>
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export const Content = ContentRender;