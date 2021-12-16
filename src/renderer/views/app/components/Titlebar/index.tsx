import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import store from '../../store';
import { Tabbar } from '../Tabbar';
import { platform } from 'os';
import { WindowsControls } from 'react-windows-controls';
import { StyledTitlebar, FullscreenExitButton } from './style';
import { NavigationButtons } from '../NavigationButtons';
import { RightButtons } from '../RightButtons';
import { Separator } from '../RightButtons/style';
import { SiteButtons } from '../SiteButtons';

const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (store.addressbarFocused) {
    e.preventDefault();
  }
};

export const Titlebar = observer(() => {
  return store.tabs.list.length > 1 ? (
    <StyledTitlebar
      onMouseDown={onMouseDown}
      isFullscreen={store.isFullscreen}
      color={store.tabs.selectedTab?.color}
      modalOpen={store.modalOpen}
    >
      {store.isCompact && <NavigationButtons />}
      <Tabbar />
      {store.isCompact && <RightButtons />}
    </StyledTitlebar>
  ) : (
    <></>
  );
});
