/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import {
  useFocusable,
  init,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from './libsIndex';
import 'joypad.js';

init({
  debug: false,
  visualDebug: false
});

const rows = [
  {
    title: 'Last games'
  },
  {
    title: 'All installed games'
  },
  {
    title: 'Not installed games'
  }
];

const assets = [
  {
    title: 'Shadow app',
    color: '#714ADD',
    path: 'C:\\Users\\Sam\\AppData\\Local\\Programs\\shadow\\Shadow.exe'
  },
  {
    title: 'Asset 2',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 3',
    color: '#512EB0'
  },
  {
    title: 'Asset 4',
    color: '#714ADD'
  },
  {
    title: 'Asset 5',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 6',
    color: '#512EB0'
  },
  {
    title: 'Asset 7',
    color: '#714ADD'
  },
  {
    title: 'Asset 8',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 9',
    color: '#512EB0'
  }
];

interface MenuItemBoxProps {
  focused: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

function MenuItem() {
  const { ref, focused, focusSelf } = useFocusable();

  return <MenuItemBox ref={ref} focused={focused} onClick={() => {focusSelf()}}/>;
}

interface MenuWrapperProps {
  hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  max-height: 80px;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '#4e4181' : '#362C56'};
`;

interface MenuProps {
  focusKey: string;
}

function Menu({ focusKey: focusKeyParam }: MenuProps) {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey,
    // setFocus, -- to set focus manually to some focusKey
    //navigateByDirection // -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts -- to force update all layouts when needed
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: null,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    //extraProps: { foo: 'bar' }
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
  width: 208px;
  height: 312px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: 'Segoe UI';
  font-size: 24px;
  font-weight: 400;
`;

interface AssetProps {
  title: string;
  color: string;
  path: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function Asset({ title, color, path, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color,
      path
    }
  });

  return (
    <AssetWrapper ref={ref} onClick={() => {focusSelf()}}>
      <AssetBox color={color} focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ContentRowProps {
  title: string;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function ContentRow({
  title: rowTitle,
  onAssetPress,
  onFocus
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus
  });

  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }) => {
      scrollingRef.current.scrollTo({
        left: x,
        behavior: 'smooth'
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map(({ title, color, path }) => (
              <Asset
                key={title}
                title={title}
                color={color}
                path={path}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px;
  margin-top: 20px;
`;

const SelectedItemBox = styled.div`
  height: 282px;
  width: 100%;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

function Content() {
  const { ref, focusKey } = useFocusable();

  const [selectedAsset, setSelectedAsset] = useState(null);

  const onAssetPress = useCallback((asset) => {
    window.ShadowLauncherApi.launchExternalApp(asset.path);
    setSelectedAsset(asset);
  }, []);

  const onRowFocus = useCallback(
    ({ y }) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        {/*<SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
          />
          <SelectedItemTitle>
            {selectedAsset
              ? selectedAsset.title
              : 'Press "Enter" to select an asset'}
          </SelectedItemTitle>
            </SelectedItemWrapper> */}
        <ScrollingRows ref={ref}>
          <div>
            {rows.map(({ title }) => (
              <ContentRow
                key={title}
                title={title}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
              />
            ))}
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}

const AppContainer = styled.div`
  background-color: #221c35;
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
