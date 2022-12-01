import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch } from 'react-redux';
import { togglePopin } from '../../Store/Reducer';
import { Popin } from '../Generics/Popin';
import { Button } from '../Generics/Button';
import { MENU_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_SMALL, THEME_PRIMARY_DARK } from '../../Constants';
import { useTranslation } from "react-i18next";
import { Loading } from '../Generics/Loading';

const InnerScanPopin = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
`

const ScanPopinContent = styled.div`
    position: relative;
`

export const ScanPopin = () => {
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onPopinClose = () => {
        setFocus(MENU_FOCUS); dispatch(togglePopin({id: SHOW_POPIN_NONE}));
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={t('ScanPopinTitle')} size={POPIN_SIZE_SMALL}>
                <InnerScanPopin ref={ref}>
                    <ScanPopinContent>
                        <Loading />
                    </ScanPopinContent>
                    <Button label={t('ScanPopinCloseButton')} action={() => { onPopinClose(); }} theme={THEME_PRIMARY_DARK}></Button>
                </InnerScanPopin>
            </Popin>
        </FocusContext.Provider>
    )
}