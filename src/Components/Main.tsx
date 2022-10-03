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
import { Settings } from './Settings';
import { Content } from './Content';
import store from '../Store/Store';
import { setWindowFocusState } from '../Store/Reducer'
import { Provider, useSelector } from 'react-redux'
import { MENU_FOCUS } from './../Constants'

import '../InputManagement.js';

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
  const { ui } = useSelector((state) => state.globalState);

  return (
      <MainWrapper>
        <GlobalStyle />
        <Menu focusKey={MENU_FOCUS} />
        <Content />
        {(ui.showSettings)? <Settings /> : ''}
      </MainWrapper>
      )
};

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>, document.querySelector('#root'));
