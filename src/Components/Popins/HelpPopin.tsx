import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext
} from '@noriginmedia/norigin-spatial-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopin } from '../../Store/Reducer';
import { Popin } from '../Generics/Popin';
import { Button } from '../Generics/Button';
import { MENU_FOCUS, SHOW_POPIN_NONE, POPIN_SIZE_FULL, THEME_PRIMARY_DARK, THEME_DARK, MAIN_INPUT_KEYBOARD, MAIN_INPUT_GAMEPAD } from '../../Constants';
import { useTranslation } from "react-i18next";
import { KeyboardLetterIcon } from '../../Images/KeyboardLetterIcon';
import { CollapseItem } from '../Generics/CollapseItem';

declare const VERSION: string;
declare const __BUILD_VERSION__: string;

const InnerHelpPopin = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 2rem;
    height: 100%;
    justify-content: space-between;
    position: relative;
    overflow-y: auto;
`

const HelpPopinContent = styled.div`
    position: relative;
    font-size: 1.5rem;

    & a {
        color: white;
    }

    & li {
        list-style: none;
        padding: 0.2rem 0;
    }
`

const FAQcontent = styled.div`
    background-color: #181d34;
    padding: 2rem 2rem;
    border-radius: 0.5rem;
`

export const HelpPopin = () => {
    // @ts-ignore (because of globalState which is not recognized)
    const { ui } = useSelector((state) => state.globalState);
    const { ref, focusKey, focusSelf, setFocus } = useFocusable({isFocusBoundary: true});
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onPopinClose = () => {
        setFocus(MENU_FOCUS); dispatch(togglePopin({id: SHOW_POPIN_NONE}));
    }

    const onFocusCallback = ({ x, y, height, width, top, left } : any, focusItem: any) => {
        if (ui.mainInput === MAIN_INPUT_KEYBOARD || ui.mainInput === MAIN_INPUT_GAMEPAD) {
            let scroll = (y < 0)? 0 : y;
            scroll = (y + height > ref.current.scrollHeight)? ref.current.scrollHeight : y;
            ref.current.scrollTo({
                top: scroll,
                behavior: "smooth"
            });
        }
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <Popin title={t('HelpPopinTitle')} 
                size={POPIN_SIZE_FULL}
                closeAction={onPopinClose}
                children={
                    <InnerHelpPopin ref={ref}>
                        <HelpPopinContent>
                            <CollapseItem label={t('FAQ1Title')} onFocus={onFocusCallback}>
                                <FAQcontent>
                                    <KeyboardLetterIcon letter='START / SELECT'/> + <KeyboardLetterIcon letter='RB / LB'/>&nbsp;
                                    {t('FAQ1Text')}
                                </FAQcontent>
                            </CollapseItem>

                            <CollapseItem label={t('FAQ2Title')} onFocus={onFocusCallback}>
                                <FAQcontent>
                                    {t('FAQ2Text')}
                                </FAQcontent>
                            </CollapseItem>

                            <CollapseItem label={t('FAQ3Title')} onFocus={onFocusCallback}>
                                <FAQcontent>
                                    {t('FAQ3Text')}
                                </FAQcontent>
                            </CollapseItem>

                            <CollapseItem label={t('FAQ4Title')} onFocus={onFocusCallback}>
                                <FAQcontent>
                                    {t('FAQ4Text')}
                                </FAQcontent>
                            </CollapseItem>

                            <CollapseItem label={t('FAQ5Title')} onFocus={onFocusCallback}>
                                <FAQcontent>
                                    <ul>
                                        <li><a href="https://github.com/Solaire/GLC" target="_blank">GLC (GPL-3.0)</a>: {t('FAQ5Line1')}</li>
                                        <li><a href="https://rawg.io/apidocs" target="_blank">RAWG.io ©</a>: {t('FAQ5Line2')}</li>
                                        <li><a href="https://www.freepik.com/free-vector/abstract-bokeh-lights-background_14721003.htm#query=abstract_bokeh_lights_background&position=15&from_view=search&track=ais" target="_blank">Background</a>: Image by vector_corp on Freepik</li>
                                    </ul>
                                </FAQcontent>
                            </CollapseItem>
                            <p>{t('FAQBuild')}{VERSION + '-' + __BUILD_VERSION__}</p>
                        </HelpPopinContent>
                    </InnerHelpPopin>}
                footer={
                    <Button label={t('HelpPopinCloseButton')} action={() => { onPopinClose(); }} theme={THEME_DARK}></Button>
                }
            />
        </FocusContext.Provider>
    )
}