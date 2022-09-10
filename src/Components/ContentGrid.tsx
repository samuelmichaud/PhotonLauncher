import React, { useCallback, useRef, useState } from 'react';

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
import { GRID_GAP } from '..//Constants';

const ContentGridWrapper = styled.div`
margin-bottom: 37px;
`;

const ContentGridTitle = styled.div`
color: white;
margin-bottom: 22px;
font-size: 27px;
font-weight: 700;
font-family: 'Segoe UI';
`;

const ContentGridScrollingWrapper = styled.div`
flex-shrink: 1;
flex-grow: 1;
`;

const ContentGridScrollingContent = styled.div`
display: flex;
flex-wrap: wrap;
gap: ${GRID_GAP}px;
`;

interface ContentGridProps {
    title: string;
    assets: Array<any>;
    scrollingRef: any;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

function ContentGridRender({
    title: rowTitle,
    assets,
    scrollingRef,
    onAssetPress,
    onFocus
}: ContentGridProps) {
    const { ref, focusKey } = useFocusable({
        onFocus
    });
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentGridWrapper>
                <ContentGridTitle>{rowTitle}</ContentGridTitle>
                <ContentGridScrollingWrapper ref={ref}>
                    <ContentGridScrollingContent>
                        {assets.map((item) => (
                            <Asset
                                key={item.id}
                                asset={item}
                                scrollingRef={scrollingRef}
                            />
                        ))}
                    </ContentGridScrollingContent>
                </ContentGridScrollingWrapper>
            </ContentGridWrapper>
        </FocusContext.Provider>
    );
}

export const ContentGrid = ContentGridRender;