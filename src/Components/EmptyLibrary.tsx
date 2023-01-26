import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { Button } from './Generics/Button';
import { Trans, useTranslation } from "react-i18next";
import { AddCustomAppButton } from './Buttons/AddCustomAppButton';
// @ts-ignore
import shield from '../Images/shield.svg';
import { BORDER_RADIUS } from '../Constants';

interface EmptyLibraryWrapperProps {
    
}

const EmptyLibraryWrapper = styled.div<EmptyLibraryWrapperProps>`
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    text-align: center;
    font-size: 2rem;

    > h1 {
        font-size: 3rem;
    }

    > h2 {
        font-size: 2rem;
    }

    > p, div {
        max-width: 100rem;
    }
`

const SecurityMessageWrapper = styled.div`
    display: flex;
    text-align: left;
    gap: 2rem;
    font-style: italic;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: ${BORDER_RADIUS}rem;
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
                <p>{t('EmptyLibraryIntro')}</p>
                <SecurityMessageWrapper>
                    <img src={shield} />
                    <p><Trans i18nKey={'EmptyLibrarySecurity'}></Trans></p>
                </SecurityMessageWrapper>
                <h2>{t('EmptyLibraryNextStep')}</h2>
                <div>
                    <Button 
                        focused={focused}
                        label={t('EmptyLibraryLabelButton')}
                        action={() => window.ShadowApi.scanForGames()}>
                    </Button>
                </div>
                <h2>{t('EmptyLibraryOr')}</h2>
                <AddCustomAppButton />
            </EmptyLibraryWrapper>
        </FocusContext.Provider>
    )
}