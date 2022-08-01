/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import 'joypad.js';
import { Menu } from './Components/Menu';
import { Content } from './Components/Content';
import { triggerKey } from './Components/RendererUtil';

init({
  debug: false,
  visualDebug: false,
  throttle: 150,
  throttleKeypresses: true
});

// at launch, we want the system to refresh installed games. However, this is asynchronous
window.ShadowApi.loadLibraryFromSource();

const AppContainer = styled.div`
  background: linear-gradient(to bottom left, #4224BF, #34B0EF);
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

  /* Use gamepad for TV navigation */
  window.joypad.set({axisMovementThreshold: 0.3});

  // @ts-ignore
  window.joypad.on('button_press', e => {
    const { buttonName } = e.detail;
    if (buttonName == 'button_12') triggerKey('ArrowUp');
    if (buttonName == 'button_13') triggerKey('ArrowDown');
    if (buttonName == 'button_14') triggerKey('ArrowLeft');
    if (buttonName == 'button_15') triggerKey('ArrowRight');
    if (buttonName == 'button_0')  triggerKey('Enter');
  });

  // @ts-ignore
  window.joypad.on('axis_move', e => {
    const { directionOfMovement } = e.detail;
      if (directionOfMovement == 'top') triggerKey('ArrowUp');
      if (directionOfMovement == 'bottom') triggerKey('ArrowDown');
      if (directionOfMovement == 'left') triggerKey('ArrowLeft');
      if (directionOfMovement == 'right') triggerKey('ArrowRight');
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
