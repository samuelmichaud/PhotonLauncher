import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout
} from '@noriginmedia/norigin-spatial-navigation';
import { AppCard } from './AppCard';
import { GRID_GAP } from '..//Constants';

const ContentGridWrapper = styled.div`
    margin-bottom: 3.7rem;
`;

const ContentGridTitle = styled.div`
    color: white;
    margin-bottom: 2.2rem;
    font-size: 2.7rem;
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
    gap: ${GRID_GAP}rem;
`;

interface ContentGridProps {
    title?: string;
    apps: Array<any>;
    scrollingRef: any;
    layoutType: string;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

export const ContentGrid = ({
    title,
    apps,
    scrollingRef,
    layoutType,
    onFocus
}: ContentGridProps) => {
    const { ref, focusKey } = useFocusable();
    
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentGridWrapper>
                {(title)? <ContentGridTitle>{title}</ContentGridTitle> : ''}
                <ContentGridScrollingWrapper ref={ref}>
                    <ContentGridScrollingContent>
                        {apps.map((item) => (
                            <AppCard
                                key={item.id}
                                app={item}
                                onFocus={onFocus}
                                scrollingRef={scrollingRef}
                                layoutType={layoutType}
                            />
                        ))}
                    </ContentGridScrollingContent>
                </ContentGridScrollingWrapper>
            </ContentGridWrapper>
        </FocusContext.Provider>
    );
}
