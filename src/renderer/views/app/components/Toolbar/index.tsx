import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledToolbar } from './style';
import { NavigationButtons } from '../NavigationButtons';

import { AddressBar } from '../AddressBar';
import { RightButtons } from '../RightButtons';
import store from '../../store';
import { platform } from 'os';
import { FullscreenExitButton } from '../Titlebar/style';
import { remote } from 'electron';
import { WindowsControls } from 'react-windows-controls';

const onFullscreenExit = (e: React.MouseEvent<HTMLDivElement>) => {
  remote.getCurrentWindow().setFullScreen(false)
}
export const Toolbar = observer(() => {
  return (
    <StyledToolbar
      isFullscreen={store.isFullscreen}
      isHTMLFullscreen={store.isHTMLFullscreen}
    >
      <NavigationButtons />
      <AddressBar />
      <RightButtons />
      {platform() !== 'darwin' && (
        store.isFullscreen ?
        <FullscreenExitButton
          style={{height: store.isCompact ? '100%' : 32}}
          onMouseUp={onFullscreenExit}
          theme={store.theme}
        /> :
        <WindowsControls
          style={{ height:  store.isCompact ? '100%' : 32, WebkitAppRegion: 'no-drag', marginLeft: 8 }}
          onClose={}
          onMinimize={}
          onMaximize={}
          dark={store.theme['toolbar.backgroundColor']}
        />
      )}
    </StyledToolbar>
  );
});
