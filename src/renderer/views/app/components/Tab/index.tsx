import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Preloader } from '~/renderer/components/Preloader';
import {
  StyledTab,
  StyledContent,
  StyledIcon,
  StyledTitle,
  StyledClose,
  StyledAction,
  StyledPinAction,
  TabContainer,
} from './style';
import {
  ICON_CLOSE,
  ICON_SETTINGS,
  ICON_VOLUME_HIGH,
  ICON_VOLUME_OFF,
} from '~/renderer/constants';
import { ITab } from '../../models';
import store from '../../store';
import * as remote from '@electron/remote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const removeTab = (tab: ITab) => async (
  e: React.MouseEvent<HTMLDivElement>,
) => {
  e.stopPropagation();
  await tab.close();
};

const toggleMuteTab = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  tab.isMuted ? store.tabs.unmuteTab(tab) : store.tabs.muteTab(tab);
};

const onCloseMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onMouseDown = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  const { pageX, button } = e;

  if (store.addressbarEditing) {
    store.inputRef.focus();
  }

  if (button === 0) {
    if (!tab.isSelected) {
      tab.select();
    } else {
      store.canOpenSearch = true;
    }

    store.tabs.lastMouseX = 0;
    store.tabs.isDragging = true;
    store.tabs.mouseStartX = pageX;
    store.tabs.tabStartX = tab.left;

    store.tabs.lastScrollLeft = store.tabs.containerRef.current.scrollLeft;
  }
};

const onClick = (tab: ITab) => async (e: React.MouseEvent<HTMLDivElement>) => {
  if (e.button === 4) {
    await tab.close();
    return;
  }

  if (store.isCompact && e.button === 0 && store.canOpenSearch) {
    store.inputRef.focus();
    store.canOpenSearch = false;
  }
};

const onMouseUp = (tab: ITab) => async (
  e: React.MouseEvent<HTMLDivElement>,
) => {
  if (e.button === 1) {
    await tab.close();
  }
};

const onContextMenu = (tab: ITab) => () => {
  const menu = remote.Menu.buildFromTemplate([
    {
      label: 'New tab to the right',
      click: async () => {
        await store.tabs.addTab(
          {
            index: store.tabs.list.indexOf(store.tabs.selectedTab) + 1,
          },
          tab.tabGroupId,
        );
      },
    },
    {
      label: 'Add to a new group',
      click: () => {
        const tabGroup = store.tabGroups.addGroup();
        tab.tabGroupId = tabGroup.id;
        store.tabs.updateTabsBounds(true);
      },
    },
    {
      label: 'Remove from group',
      visible: !!tab.tabGroup,
      click: () => {
        tab.removeFromGroup();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: async () => {
        await tab.callViewMethod('webContents.reload');
      },
    },
    {
      label: 'Duplicate',
      click: async () => {
        await store.tabs.addTab({ active: true, url: tab.url });
      },
    },
    {
      label: tab.isPinned ? 'Unpin tab' : 'Pin tab',
      click: () => {
        tab.isPinned ? store.tabs.unpinTab(tab) : store.tabs.pinTab(tab);
      },
    },
    {
      label: tab.isMuted ? 'Unmute tab' : 'Mute tab',
      click: () => {
        tab.isMuted ? store.tabs.unmuteTab(tab) : store.tabs.muteTab(tab);
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Close tab',
      accelerator: 'CmdOrCtrl+W',
      click: async () => {
        await tab.close();
      },
    },
    {
      label: 'Close other tabs',
      click: async () => {
        for (const t of store.tabs.list) {
          if (t !== tab) {
            await t.close();
          }
        }
      },
    },
    {
      label: 'Close tabs to the left',
      click: async () => {
        for (let i = store.tabs.list.indexOf(tab) - 1; i >= 0; i--) {
          await store.tabs.list[i].close();
        }
      },
    },
    {
      label: 'Close tabs to the right',
      click: async () => {
        for (
          let i = store.tabs.list.length - 1;
          i > store.tabs.list.indexOf(tab);
          i--
        ) {
          await store.tabs.list[i].close();
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Revert closed tab',
      enabled: store.tabs.closedUrl !== '',
      click: () => {
        store.tabs.revertClosed();
      },
    },
  ]);

  menu.popup();
};

const Content = observer(({ tab }: { tab: ITab }) => {
  const favicon = React.useMemo(() => {
    if (!tab.favicon) return undefined;
    if (tab.favicon.startsWith('data:undefined')) return undefined;
    else return tab.favicon !== '' ? tab.favicon : undefined;
  }, [tab.favicon]);
  return (
    <StyledContent>
      {!tab.loading && !!favicon && (
        <StyledIcon
          isIconSet={favicon !== ''}
          style={{ backgroundImage: favicon ? `url(${favicon})` : '' }}
        >
          {favicon ? (
            <PinnedVolume tab={tab} />
          ) : (
            <FontAwesomeIcon icon={ICON_SETTINGS} />
          )}
        </StyledIcon>
      )}

      {tab.loading && (
        <Preloader
          thickness={6}
          size={16}
          indeterminate
          style={{ minWidth: 16, marginRight: '8px' }}
        />
      )}
      {!tab.isPinned && (
        <StyledTitle isIcon={tab.isIconSet} selected={tab.isSelected}>
          {tab.isSelected && store.isCompact ? tab.url : tab.title}
        </StyledTitle>
      )}
      <ExpandedVolume tab={tab} />
      <Close tab={tab} />
    </StyledContent>
  );
});

const ExpandedVolume = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledAction
      onMouseDown={onVolumeMouseDown}
      onClick={toggleMuteTab(tab)}
      visible={tab.isExpanded && !tab.isPinned && tab.isPlaying}
    >
      <FontAwesomeIcon
        icon={tab.isMuted ? ICON_VOLUME_OFF : ICON_VOLUME_HIGH}
      />
    </StyledAction>
  );
});

const PinnedVolume = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledPinAction
      onMouseDown={onVolumeMouseDown}
      onClick={toggleMuteTab(tab)}
      visible={tab.isPinned && tab.isPlaying}
    >
      <FontAwesomeIcon
        icon={tab.isMuted ? ICON_VOLUME_OFF : ICON_VOLUME_HIGH}
      />
    </StyledPinAction>
  );
});

const Close = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledClose
      onMouseDown={onCloseMouseDown}
      onClick={removeTab(tab)}
      visible={tab.isExpanded && !tab.isPinned}
    >
      <FontAwesomeIcon icon={ICON_CLOSE} />
    </StyledClose>
  );
});

export default observer(({ tab, index }: { tab: ITab; index: number }) => {
  return (
    <StyledTab
      selected={tab.isSelected}
      onMouseDown={onMouseDown(tab)}
      onMouseUp={onMouseUp(tab)}
      onContextMenu={onContextMenu(tab)}
      onClick={onClick(tab)}
      ref={tab.ref}
    >
      <TabContainer
        hasTabGroup={tab.tabGroupId !== -1}
        pinned={tab.isPinned}
        selected={tab.isSelected}
        color={store.tabs.selectedTab?.color}
        style={{
          marginLeft: index !== 0 ? '8px' : '1px',
          borderColor:
            tab.isSelected && tab.tabGroupId !== -1 && !store.isCompact
              ? tab.tabGroup.color
              : 'transparent',
        }}
      >
        <Content tab={tab} />
      </TabContainer>
    </StyledTab>
  );
});
