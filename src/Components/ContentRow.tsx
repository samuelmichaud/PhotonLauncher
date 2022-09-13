import React, { useCallback, useRef } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';
import { Asset } from './Asset';

const ContentRowWrapper = styled.div`
margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
color: white;
margin-bottom: 22px;
font-size: 27px;
font-weight: 700;
font-family: 'Segoe UI';
padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
overflow-x: auto;
overflow-y: hidden;
flex-shrink: 1;
flex-grow: 1;
padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
display: flex;
flex-direction: row;
`;

interface ContentRowProps {
    title: string;
    assets: Array<any>;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

function ContentRowRender({
    title: rowTitle,
    assets: assets,
    onAssetPress,
    onFocus
}: ContentRowProps) {
    const { ref, focusKey } = useFocusable({
        onFocus
    });

    const scrollingRef = useRef(null);

    const onAssetFocus = useCallback(
        ({ x }) => {
            scrollingRef.current.scrollTo({
                left: x,
                behavior: 'smooth'
            });
        },
        [scrollingRef]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentRowWrapper ref={ref}>
                <ContentRowTitle>{rowTitle}</ContentRowTitle>
                <ContentRowScrollingWrapper ref={scrollingRef}>
                    <ContentRowScrollingContent>
                        {assets.map((asset) => (
                            <Asset
                                asset={asset}
                                key={asset.id}
                                onFocus={onFocus}
                                scrollingRef={scrollingRef}
                            />
                        ))}
                    </ContentRowScrollingContent>
                </ContentRowScrollingWrapper>
            </ContentRowWrapper>
        </FocusContext.Provider>
    );
}

export const ContentRow = ContentRowRender;