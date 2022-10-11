import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { Button } from './Button';
import { useTranslation } from "react-i18next";

interface EmptyLibraryWrapperProps {
    
}

const EmptyLibraryWrapper = styled.div<EmptyLibraryWrapperProps>`
    position: relative;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
`

export const EmptyLibrary = () => {
    const { ref, focusKey, focused, focusSelf  } = useFocusable();
    const { t } = useTranslation();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <EmptyLibraryWrapper ref={ref} >
                <h1>{t('EmptyLibraryTitle')}</h1>
                <Button 
                    focused={focused}
                    label={t('EmptyLibraryLabelButton')}
                    action={() => window.ShadowApi.scanForGames()}>
                </Button>
            </EmptyLibraryWrapper>
        </FocusContext.Provider>
    )
}