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
import { setWindowFocusState, togglePopin, setConfig } from '../Store/Reducer'
import { Provider, useSelector } from 'react-redux'

import '../InputManagement.js';
import { MAIN_INPUT_MOUSE, SHOW_POPIN_APP_ACTION, SHOW_POPIN_SCAN, SHOW_POPIN_SETTINGS } from '../Constants';
import { ScanPopin } from './ScanPopin';
import { AppActionPopin } from './AppActionPopin';
import { useTranslation } from "react-i18next";
import App from '../Model/App';

init({
  debug: false,
  visualDebug: false,
  throttle: 150,
  throttleKeypresses: true
});

window.ShadowApi.listenForWindowFocusChange((payload: boolean) => {
  store.dispatch(setWindowFocusState(payload));
});
window.ShadowApi.listenForTogglePopin((payload: any) => {
    store.dispatch(togglePopin(payload));
});
window.ShadowApi.loadConfig((config: any) => {
    store.dispatch(setConfig(config));
});

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface MainWrapperProps {
  mainInput?: string;
}

const MainWrapper = styled.div<MainWrapperProps>`
  background: linear-gradient(to bottom left, #4224BF, #34B0EF);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${({mainInput}) => (mainInput === MAIN_INPUT_MOUSE? '': 'cursor: none;')}
`

const MainContainer = () => {
  //@ts-ignore
  const { ui, config, apps } = useSelector((state) => state.globalState);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(config.lang.value);
    window.ShadowApi.updateStartupMode(config.launchOption);
  }, [config.lang.value, config.launchOption]);

  return (
      <MainWrapper mainInput={ui.mainInput}>
        <GlobalStyle/>
        <Menu />
        <Content />
        {ui.popin.id === SHOW_POPIN_SETTINGS && <Settings />}
        {ui.popin.id === SHOW_POPIN_SCAN && <ScanPopin />}
        {ui.popin.id === SHOW_POPIN_APP_ACTION && <AppActionPopin app={apps.filter((item: App) => item.id === ui.popin.context)[0]}/>}
        <NavHelper />
      </MainWrapper>
      )
};

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>, document.querySelector('#root'));
