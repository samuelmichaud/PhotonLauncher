/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import { useFocusable, init } from '@noriginmedia/norigin-spatial-navigation';
import 'joypad.js';
import { Menu } from './Components/Menu';
import { Content } from './Components/Content';

init({
  debug: false,
  visualDebug: false
});

const AppContainer = styled.div`
  background: linear-gradient(#4224BF, #34B0EF);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {

  const {
    navigateByDirection // -- to manually navigate by direction
  } = useFocusable();

  /* Use gamepad for TV navigation */
  // @ts-ignore
  window.joypad.on('button_press', e => {
    const { buttonName } = e.detail;
    if (buttonName == 'button_12') navigateByDirection('up', {});
    if (buttonName == 'button_13') navigateByDirection('down', {});
    if (buttonName == 'button_14') navigateByDirection('left', {});
    if (buttonName == 'button_15') navigateByDirection('right', {});
  });

  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" />
      <Content />
    </AppContainer>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
