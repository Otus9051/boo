import * as React from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';
import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import { Input } from '~/renderer/components/Input';
import { useState } from 'react';
import { NormalButton } from '../App';

const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const ThemeVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <Row>
      <Title>Theme variant</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
        >
          <Dropdown.Item value="auto">Auto</Dropdown.Item>
          <Dropdown.Item value="skye-light">Light</Dropdown.Item>
          <Dropdown.Item value="skye-dark">Dark</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const WarnQuit = observer(() => {
  const { warnOnQuit } = store.settings;

  return (
    <Row onClick={onSwitchChange('warnOnQuit')}>
      <Title>Show warning dialog when closing multiple tabs</Title>
      <Control>
        <Switch value={warnOnQuit} />
      </Control>
    </Row>
  );
});

const BookmarksBar = observer(() => {
  const { bookmarksBar } = store.settings;

  return (
    <Row onClick={onSwitchChange('bookmarksBar')}>
      <Title>Show bookmarks bar</Title>
      <Control>
        <Switch value={bookmarksBar} />
      </Control>
    </Row>
  );
});

const ShowFrequentlyVisited = observer(() => {
  const { tab } = store.settings;

  return (
    <Row onClick={onSwitchChange('tab', 'topSites')}>
      <Title>Show frequently visited</Title>
      <Control>
        <Switch value={tab.topSites} />
      </Control>
    </Row>
  );
});

const ShowPinnedSites = observer(() => {
  const { tab } = store.settings;

  return (
    <Row onClick={onSwitchChange('tab', 'pinned')}>
      <Title>Show pinned sites</Title>
      <Control>
        <Switch value={tab.pinned} />
      </Control>
    </Row>
  );
});

const NewTabImage = observer(() => {
  const { tab } = store.settings;
  const [image, setImage] = useState('');
  return (
    <Row>
      <Title>New tab image</Title>
      <Control>
        <Input
          onChange={(event) => {
            setImage(event.target.value);
          }}
          style={{
            width: '200px',
          }}
          tabIndex={0}
          className="textfield"
          value={tab.image}
        />
      </Control>
      <NormalButton
        onClick={() => {
          store.settings.tab.image = image;
          store.save();
        }}
      >
        Save
      </NormalButton>
    </Row>
  );
});

export const Appearance = observer(() => {
  return (
    <>
      <Header>Appearance</Header>
      <BookmarksBar />
      <WarnQuit />
      <ThemeVariant />
      <ShowFrequentlyVisited />
      <NewTabImage />
    </>
  );
});
