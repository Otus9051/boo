import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledToolbar } from './style';
import { NavigationButtons } from '../NavigationButtons';

import { AddressBar } from '../AddressBar';
import { RightButtons } from '../RightButtons';
import store from '../../store';

export const Toolbar = observer(() => {
  return (
    <StyledToolbar
      isFullscreen={store.isFullscreen}
      isHTMLFullscreen={store.isHTMLFullscreen}
    >
      <NavigationButtons />
      <AddressBar />
      <RightButtons />
    </StyledToolbar>
  );
});
