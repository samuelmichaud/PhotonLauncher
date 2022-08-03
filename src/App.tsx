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

  console.log('totooooo');

  /* Use gamepad for TV navigation */
  window.joypad.set({axisMovementThreshold: 0.3});

  // @ts-ignore
  window.joypad.on('button_press', e => {
    const { buttons } = e.detail.gamepad;

    // We need a shortcut to bring the app to front
    if (buttons[4].pressed && buttons[8].pressed || buttons[9].pressed && buttons[5].pressed) {
      window.ShadowApi.bringWindowToFront();
    };

    // For navigation purposes 
    if (buttons[12].pressed) triggerKey('ArrowUp');
    if (buttons[13].pressed) triggerKey('ArrowDown');
    if (buttons[14].pressed) triggerKey('ArrowLeft');
    if (buttons[15].pressed) triggerKey('ArrowRight');
    if (buttons[0].pressed)  triggerKey('Enter');
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
