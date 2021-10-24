import * as React from 'react';
import { NavigationDrawer } from '../NavigationDrawer';
import { observer } from 'mobx-react-lite';
import {
  ICON_SETTINGS,
  ICON_HISTORY,
  ICON_BOOKMARKS,
  ICON_EXTENSIONS,
  ICON_DOWNLOAD,
} from '~/renderer/constants/icons';
import { getWebUIURL } from '~/common/webui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const MenuItem = observer(
  ({
    name,
    children,
    icon,
    global,
  }: {
    name: string;
    children: any;
    icon?: IconProp;
    global?: boolean;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (window.location.href = getWebUIURL(name))}
      selected={window.location.href.startsWith(getWebUIURL(name))}
      icon={icon}
      global={global}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

export const GlobalNavigationDrawer = () => {
  return (
    <NavigationDrawer dense title="" global>
      <MenuItem name="settings" global>
        <FontAwesomeIcon icon={ICON_SETTINGS} fixedWidth />
      </MenuItem>
      <MenuItem name="history" global>
        <FontAwesomeIcon icon={ICON_HISTORY} fixedWidth />
      </MenuItem>
      <MenuItem name="bookmarks" global>
        <FontAwesomeIcon icon={ICON_BOOKMARKS} fixedWidth />
      </MenuItem>
      {/* <MenuItem name="downloads" icon={ICON_DOWNLOAD}>
        Downloads
      </MenuItem>
      <MenuItem name="extensions" icon={ICON_EXTENSIONS}>
        Extensions
      </MenuItem> */}
    </NavigationDrawer>
  );
};
