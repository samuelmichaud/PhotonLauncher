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

const ContentGridWrapper = styled.div`
margin-bottom: 37px;
`;

const ContentGridTitle = styled.div`
color: white;
margin-bottom: 22px;
font-size: 27px;
font-weight: 700;
font-family: 'Segoe UI';
padding-left: 60px;
`;

const ContentGridScrollingWrapper = styled.div`
flex-shrink: 1;
flex-grow: 1;
padding-left: 60px;
`;

const ContentGridScrollingContent = styled.div`
display: flex;
flex-wrap: wrap;
`;

interface ContentGridProps {
    title: string;
    assets: Array<any>;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

function ContentGridRender({
    title: rowTitle,
    assets: assets,
    onAssetPress,
    onFocus
}: ContentGridProps) {
    const { ref, focusKey } = useFocusable({
        onFocus
    });

    const scrollingRef = useRef(null);

    const onAssetFocus = useCallback(
        ({ x, y }) => {
            scrollingRef.current.scrollTo({
                bottom: y,
                behavior: 'smooth'
            });
        },
        [scrollingRef]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentGridWrapper ref={ref}>
                <ContentGridTitle>{rowTitle}</ContentGridTitle>
                <ContentGridScrollingWrapper ref={scrollingRef}>
                    <ContentGridScrollingContent>
                        {assets.map(({ id, title, launch }) => (
                            <Asset
                                id={id}
                                title={title}
                                path={launch}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </ContentGridScrollingContent>
                </ContentGridScrollingWrapper>
            </ContentGridWrapper>
        </FocusContext.Provider>
    );
}

export const ContentGrid = ContentGridRender;