import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { Button } from './Button';

interface EmptyLibraryWrapperProps {
    
}

const EmptyLibraryWrapper = styled.div<EmptyLibraryWrapperProps>`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
`

export const EmptyLibrary = () => {
    const { ref, focusKey, focused, focusSelf  } = useFocusable();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <EmptyLibraryWrapper ref={ref} >
                <h1>{'Launch a scan to see your apps...'}</h1>
                <Button 
                    focused={focused}
                    label={'Launch a scan'}
                    action={() => window.ShadowApi.scanForGames()}>
                </Button>
            </EmptyLibraryWrapper>
        </FocusContext.Provider>
    )
}