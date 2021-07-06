import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';

export const Accounts = () => {
  return (
    <>
      <Header>Account</Header>
      <Row>
        <div>
          <Title>Logged In</Title>
          <SecondaryText>No user Logged In</SecondaryText>
        </div>

        <Control>
          <NormalButton>Login</NormalButton>
        </Control>
      </Row>
    </>
  );
};
