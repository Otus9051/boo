import * as React from 'react';

import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { NormalButton } from '../App';
import { getWebUIURL } from '~/common/webui';
import { observer } from 'mobx-react-lite';
import decode from 'jwt-decode';

export const Accounts = observer(() => {
  const { token } = store.settings;
  return (
    <>
      <Header>Account</Header>
      <Row>
        <div>
          <Title>{token ? 'Logged In' : 'Logged Out'}</Title>
          <SecondaryText>
            {token
              ? (decode(token) as { sub: string }).sub
              : 'No user logged In'}
          </SecondaryText>
        </div>

        <Control>
          {token ? (
            <NormalButton
              onClick={() => {
                store.settings.token = null;
                store.save();
              }}
            >
              Logout
            </NormalButton>
          ) : (
            <NormalButton
              onClick={() =>
                (window.location.href = `https://id.innatical.com/connect?callback=${getWebUIURL(
                  'settings',
                )}`)
              }
            >
              Login
            </NormalButton>
          )}
        </Control>
      </Row>
    </>
  );
});
