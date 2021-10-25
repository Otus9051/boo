import * as React from 'react';

import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { Switch } from '~/renderer/components/Switch';
import { NormalButton } from '../App';
import { ipcRenderer } from 'electron';

export const General = observer(() => {
  return (
    <>
      <Header>General</Header>
      <Row>
        <div>
          <Title>Default Browser</Title>
        </div>
        <Control>
          <NormalButton
            onClick={async () => {
              await ipcRenderer.invoke('set-default-browser');
            }}
          >
            Set as Default
          </NormalButton>
        </Control>
      </Row>
    </>
  );
});
