import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ipcRenderer } from 'electron';
import { SettingsSection } from '../../store';
import { Appearance } from '../Appearance';
import { AddressBar, ManageSearchEngines } from '../AddressBar';
import { Accounts } from '../Accounts';
import { Privacy } from '../Privacy';
import { General } from '../General';
import store from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { Button } from '~/renderer/components/Button';
import { ThemeProvider } from 'styled-components';
import { Autofill } from '../Autofill';
import { OnStartup } from '../Startup';
import { Content, LeftContent, Container } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import { Downloads } from '../Downloads';
import {
  ICON_PALETTE,
  ICON_AUTOFILL,
  ICON_POWER,
  ICON_SEARCH,
  ICON_DOWNLOAD,
  ICON_SHIELD,
  ICON_TRASH,
  ICON_EDIT,
  ICON_PERSON,
  ICON_SETTINGS,
} from '~/renderer/constants';
import {
  ContextMenuItem,
  ContextMenu,
} from '~/renderer/components/ContextMenu';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
} from '~/renderer/views/bookmarks/components/App/style';
import { Textfield } from '~/renderer/components/Textfield';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const NormalButton = ({
  children,
  onClick,
}: {
  children?: any;
  onClick?: any;
}) => {
  return (
    <Button
      background={store.theme['button.backgroundColor']}
      onClick={onClick}
      foreground={store.theme['dialog.lightForeground'] ? 'white' : 'black'}
    >
      {children}
    </Button>
  );
};

const MenuItem = observer(
  ({
    section,
    subSections,
    children,
    icon,
  }: {
    section: SettingsSection;
    subSections?: SettingsSection[];
    children: any;
    icon?: IconProp;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedSection = section)}
      icon={icon}
      selected={
        store.selectedSection === section ||
        (subSections && subSections.includes(store.selectedSection))
      }
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

const onBlur = () => {
  store.menuVisible = false;
};

const onMakeDefaultClick = () => {
  store.settings.searchEngine = store.settings.searchEngines.findIndex(
    (x) => x.keyword === store.editedSearchEngine.keyword,
  );
  store.menuVisible = false;
};

const onRemoveClick = () => {
  store.settings.searchEngines = store.settings.searchEngines.filter(
    (x) => x.keyword !== store.editedSearchEngine.keyword,
  );
  store.save();
  store.menuVisible = false;
};

const onEditClick = () => {
  store.menuVisible = false;
  store.dialogVisible = true;
  store.dialogContent = 'edit-search-engine';
  store.searchEngineInputRef.current.value = store.editedSearchEngine.name;
  store.searchEngineKeywordInputRef.current.value =
    store.editedSearchEngine.keyword;
  store.searchEngineUrlInputRef.current.value = store.editedSearchEngine.url;
};

const onSaveClick = () => {
  const name = store.searchEngineInputRef.current.value.trim();
  const keyword = store.searchEngineKeywordInputRef.current.value.trim();
  const url = store.searchEngineUrlInputRef.current.value.trim();

  const item = store.settings.searchEngines.find((x) => x.keyword === keyword);

  if (keyword !== '' && name !== '' && url !== '') {
    if (store.dialogContent === 'edit-search-engine') {
      item.name = name;
      item.keyword = keyword;
      item.url = url;
      store.dialogVisible = false;
    } else if (store.dialogContent === 'add-search-engine') {
      if (!item) {
        store.settings.searchEngines.push({
          name,
          keyword,
          url,
        });
        store.dialogVisible = false;
      }
    }
    store.save();
  }
};

export default observer(() => {
  const { selectedSection } = store;

  let dialogTitle = '';

  if (store.dialogContent === 'edit-search-engine') {
    dialogTitle = 'Edit search engine';
  } else if (store.dialogContent === 'add-search-engine') {
    dialogTitle = 'Add search engine';
  }

  React.useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (!token) return;

      store.selectedSection = 'account';
      store.settings.token = token;
      store.save();

      ipcRenderer.invoke('bookmarks-sync');
      window.history.replaceState(null, null, window.location.pathname);
    })();
  }, []);

  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['pages.lightForeground'] }}
    >
      <Container
        onMouseDown={(e) => (store.dialogVisible = false)}
        darken={store.dialogVisible}
      >
        <WebUIStyle />
        <GlobalNavigationDrawer></GlobalNavigationDrawer>
        <ContextMenu
          tabIndex={1}
          ref={store.menuRef}
          onBlur={onBlur}
          style={{
            top: store.menuInfo.top,
            left: store.menuInfo.left,
          }}
          visible={store.menuVisible}
        >
          {store.editedSearchEngine &&
            store.editedSearchEngine.keyword !== store.searchEngine.keyword && (
              <>
                <ContextMenuItem onClick={onMakeDefaultClick}>
                  Make default
                </ContextMenuItem>
                <ContextMenuItem onClick={onRemoveClick}>
                  <FontAwesomeIcon icon={ICON_TRASH} />
                  Remove
                </ContextMenuItem>
              </>
            )}
          {store.editedSearchEngine && (
            <ContextMenuItem onClick={onEditClick}>
              <FontAwesomeIcon icon={ICON_EDIT} />
              Edit
            </ContextMenuItem>
          )}
        </ContextMenu>
        <Dialog
          onMouseDown={(e) => e.stopPropagation()}
          visible={store.dialogVisible}
          ref={store.dialogRef}
          style={{ width: 350 }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Textfield
            style={{ width: '100%' }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineInputRef}
            label="Search engine"
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineKeywordInputRef}
            label="Keyword"
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineUrlInputRef}
            label="URL with %s in place of query"
          ></Textfield>

          <DialogButtons>
            <NormalButton onClick={() => (store.dialogVisible = false)}>
              Cancel
            </NormalButton>
            <Button onClick={onSaveClick} style={{ marginLeft: 8 }}>
              Save
            </Button>
          </DialogButtons>
          <div style={{ clear: 'both' }}></div>
        </Dialog>
        <NavigationDrawer title="Settings">
          <MenuItem section="general" icon={ICON_SETTINGS}>
            General
          </MenuItem>
          <MenuItem section="appearance" icon={ICON_PALETTE}>
            Appearance
          </MenuItem>
          {process.env.ENABLE_AUTOFILL && (
            <MenuItem section="autofill" icon={ICON_AUTOFILL}>
              Autofill
            </MenuItem>
          )}
          <MenuItem section="startup" icon={ICON_POWER}>
            Startup Settings
          </MenuItem>
          <MenuItem
            section="address-bar"
            subSections={['search-engines']}
            icon={ICON_SEARCH}
          >
            Search Engines
          </MenuItem>
          <MenuItem section="downloads" icon={ICON_DOWNLOAD}>
            Download Settings
          </MenuItem>
          <MenuItem section="privacy" icon={ICON_SHIELD}>
            Privacy
          </MenuItem>
          <MenuItem section="account" icon={ICON_PERSON}>
            Innatical ID
          </MenuItem>
          {/* <MenuItem section="permissions">Site permissions</MenuItem> */}

          {/* <MenuItem section="language">Languages</MenuItem> */}
          {/* <MenuItem section="shortcuts">Keyboard shortcuts</MenuItem> */}
          {/* <MenuItem section="system">System</MenuItem> */}
        </NavigationDrawer>
        <Content>
          <LeftContent style={{ maxWidth: 800, marginTop: 56 }}>
            {selectedSection === 'general' && <General />}
            {selectedSection === 'appearance' && <Appearance />}
            {selectedSection === 'autofill' && process.env.ENABLE_AUTOFILL && (
              <Autofill />
            )}
            {selectedSection === 'address-bar' && <AddressBar />}
            {selectedSection === 'search-engines' && <ManageSearchEngines />}
            {selectedSection === 'startup' && <OnStartup />}
            {selectedSection === 'privacy' && <Privacy />}
            {selectedSection === 'downloads' && <Downloads />}
            {selectedSection === 'account' && <Accounts />}
          </LeftContent>
        </Content>
      </Container>
    </ThemeProvider>
  );
});
