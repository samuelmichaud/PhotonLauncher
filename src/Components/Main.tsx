/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './Menu';
import { NavHelper } from './NavHelper';
import { Settings } from './Settings';
import { Content } from './Content';
import store from '../Store/Store';
import { setWindowFocusState, togglePopin } from '../Store/Reducer'
import { Provider, useSelector } from 'react-redux'

import '../InputManagement.js';
import { SHOW_POPIN_SCAN, SHOW_POPIN_SETTINGS } from '../Constants';
import { ScanPopin } from './ScanPopin';
import { useTranslation } from "react-i18next";

init({
  debug: false,
  visualDebug: false,
  throttle: 150,
  throttleKeypresses: true
});

// at launch, we want the system to refresh installed games. However, this is asynchronous
window.ShadowApi.loadLibraryFromSource();
window.ShadowApi.listenForWindowFocusChange((payload: boolean) => {
  store.dispatch(setWindowFocusState(payload));
});
window.ShadowApi.listenForTogglePopin((payload: any) => {
    store.dispatch(togglePopin(payload));
});

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainWrapper = styled.div`
  background: linear-gradient(to bottom left, #4224BF, #34B0EF);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContainer = () => {
  //@ts-ignore
  const { ui, config } = useSelector((state) => state.globalState);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(config.lang.value);
    window.ShadowApi.updateStartupMode(config.launchOption);
  }, [config.lang.value, config.launchOption]);

  return (
      <MainWrapper>
        <GlobalStyle />
        <Menu />
        <Content />
        {ui.popin === SHOW_POPIN_SETTINGS && <Settings />}
        {ui.popin === SHOW_POPIN_SCAN && <ScanPopin />}
        <NavHelper />
      </MainWrapper>
      )
};

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>, document.querySelector('#root'));
