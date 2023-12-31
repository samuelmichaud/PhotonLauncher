import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './Menu';
import { NavHelper } from './NavHelper';
import { SettingsPopin } from './Popins/SettingsPopin';
import { Content } from './Content';
import store from '../Store/Store';
import { setWindowFocusState, togglePopin, setConfig } from '../Store/Reducer'
import { Provider, useSelector } from 'react-redux'

import '../InputManagement.js';
import { GRADIENT_BOTTOM_LEFT, GRADIENT_TOP_RIGHT, MAIN_INPUT_MOUSE, SHOW_POPIN_APP_ACTION, SHOW_POPIN_HELP, SHOW_POPIN_SCAN, SHOW_POPIN_SETTINGS } from '../Constants';
import { ScanPopin } from './Popins/ScanPopin';
import { HelpPopin } from './Popins/HelpPopin';
import { AppActionPopin } from './Popins/AppActionPopin';
import { useTranslation } from "react-i18next";
import App from '../Model/App';
// @ts-ignore
import cursor from "../Images/cursor.svg";
// @ts-ignore
import main_background from "../Images/main_background.jpg";

init({
  debug: false,
  visualDebug: false,
  throttle: 150,
  throttleKeypresses: true
});

window.PhotonApi.listenForWindowFocusChange((payload: boolean) => {
  store.dispatch(setWindowFocusState(payload));
});
window.PhotonApi.listenForTogglePopin((payload: any) => {
  store.dispatch(togglePopin(payload));
});
window.PhotonApi.loadConfig((config: any) => {
    store.dispatch(setConfig(config));
});

interface GlobalStyleProps {
  mainInput?: string;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ::-webkit-scrollbar {
    display: none;
  }
  :root {
    cursor: ${({mainInput}) => (mainInput === MAIN_INPUT_MOUSE? 'url("' + cursor + '"), pointer': 'none')};
  }
`;

const MainWrapper = styled.div`
  //background: linear-gradient(to bottom left, ${GRADIENT_TOP_RIGHT}, ${GRADIENT_BOTTOM_LEFT});
  background: url('${main_background}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  @media (min-aspect-ratio: 21/9) {
    padding: 0 10vw;
  }
`

const MainContainer = () => {
  //@ts-ignore
  const { ui, config, apps } = useSelector((state) => state.globalState);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(config.lang.value);
    window.PhotonApi.updateStartupMode(config.launchOption);
  }, [config.lang.value, config.launchOption]);

  return (
      <MainWrapper>
        <GlobalStyle mainInput={ui.mainInput}/>
        <Menu />
        <Content />
        {ui.popin.id === SHOW_POPIN_SETTINGS && <SettingsPopin />}
        {ui.popin.id === SHOW_POPIN_SCAN && <ScanPopin />}
        {ui.popin.id === SHOW_POPIN_HELP && <HelpPopin />}
        {ui.popin.id === SHOW_POPIN_APP_ACTION && <AppActionPopin app={apps.filter((item: App) => item.id === ui.popin.context)[0]}/>}
        <NavHelper />
      </MainWrapper>
      )
};

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>, document.querySelector('#root'));
