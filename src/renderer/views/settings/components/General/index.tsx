import * as React from 'react';

import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { Switch } from '~/renderer/components/Switch';

export const General = observer(() => {
  const { defaultBrowser } = store.settings;
  return (
    <>
      <Header>General</Header>
      <Row>
        <div>
          <Title>Default Browser</Title>
        </div>
        <Control>
          <Switch
            value={defaultBrowser}
            onClick={() => {
              store.settings.defaultBrowser = !store.settings.defaultBrowser;
              store.save();
            }}
          />
        </Control>
      </Row>
    </>
  );
});
