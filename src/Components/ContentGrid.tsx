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

    const onAssetFocus = useCallback(
        ({ x, y, height, width, top, left }) => {
            scrollingRef.current.scrollTo({
                top: top - height,
                behavior: "smooth"
            });
        },
        [scrollingRef]
    );
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentGridWrapper ref={ref}>
                <ContentGridTitle>{rowTitle}</ContentGridTitle>
                <ContentGridScrollingWrapper>
                    <ContentGridScrollingContent>
                        {assets.map(({ id, title, launch, tgdbID, background_image }) => (
                            <Asset
                                id={id}
                                title={title}
                                path={launch}
                                tgdbID={tgdbID}
                                background_image={background_image}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                                key={rowTitle + id}
                            />
                        ))}
                    </ContentGridScrollingContent>
                </ContentGridScrollingWrapper>
            </ContentGridWrapper>
        </FocusContext.Provider>
    );
}

export const ContentGrid = ContentGridRender;