import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import { ToolbarButton } from '../ToolbarButton';
import { BrowserAction } from '../BrowserAction';
import {
  ICON_ADD,
  ICON_SHIELD,
  ICON_DOWNLOAD,
  ICON_INCOGNITO,
  ICON_MORE,
} from '~/renderer/constants/icons';
import { Buttons, Separator } from './style';
import store from '../../store';
import { SiteButtons } from '../SiteButtons';
import { AddTab } from '../Tabbar/style';

let menuRef: HTMLDivElement = null;

const onAddTabClick = async () => {
  await store.tabs.addTab();
};

const onDownloadsClick = async (e: React.MouseEvent<HTMLDivElement>) => {
  const { right, bottom } = e.currentTarget.getBoundingClientRect();
  store.downloadNotification = false;
  ipcRenderer.send(`show-downloads-dialog-${store.windowId}`, right, bottom);
};

const showMenuDialog = async () => {
  const { right, bottom } = menuRef?.getBoundingClientRect() ?? {
    right: 1000,
    bottom: 50,
  };
  ipcRenderer.send(`show-menu-dialog-${store.windowId}`, right, bottom);
};

ipcRenderer.on('show-menu-dialog', () => {
  showMenuDialog();
});

const onMenuClick = async () => {
  showMenuDialog();
};

const BrowserActions = observer(() => {
  const { selectedTabId } = store.tabs;

  return (
    <>
      {selectedTabId &&
        store.extensions.browserActions.map((item) => {
          if (item.tabId === selectedTabId) {
            return <BrowserAction data={item} key={item.extensionId} />;
          }
          return null;
        })}
      {/* {selectedTabId && (
        <browser-action-list
        // partition="persist:view"
        // tab={String(selectedTabId)}
        ></browser-action-list>
      )} */}
    </>
  );
});

export const RightButtons = observer(() => {
  return (
    <Buttons>
      <BrowserActions />
      {store.extensions.browserActions.length > 0 && <Separator />}
      {store.isCompact && (
        <>
          <SiteButtons />
          <Separator />
        </>
      )}

      {store.downloadsButtonVisible && (
        <ToolbarButton
          size={18}
          badge={store.downloadNotification}
          onMouseDown={onDownloadsClick}
          toggled={store.dialogsVisibility['downloads-dialog']}
          icon={ICON_DOWNLOAD}
          badgeTop={9}
          badgeRight={9}
          inhertTextColor
          preloader
          value={store.downloadProgress}
        ></ToolbarButton>
      )}
      {store.isIncognito && <ToolbarButton icon={ICON_INCOGNITO} size={18} />}
      <ToolbarButton
        divRef={(r: any) => (menuRef = r)}
        toggled={store.dialogsVisibility['menu']}
        badge={store.updateAvailable}
        badgeRight={10}
        badgeTop={6}
        inhertTextColor
        onMouseDown={onMenuClick}
        icon={ICON_MORE}
        size={18}
      />
      <ToolbarButton
        badgeRight={10}
        onMouseDown={onAddTabClick}
        inhertTextColor
        icon={ICON_ADD}
        size={18}
      />
    </Buttons>
  );
});
