import * as React from 'react';

import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { NormalButton } from '../App';
import { getWebUIURL } from '~/common/webui';
import { observer } from 'mobx-react-lite';

export const Accounts = observer(() => {
  const { token } = store.settings;
  const [username, setUsername] = React.useState('Loading...');

  React.useEffect(() => {
    if (!token) return;

    fetch(
      'https://api.id.innatical.com/users.me?' +
        new URLSearchParams({ input: JSON.stringify({ token }) }),
    )
      .then((res) => res.json())
      .then(
        (json: {
          result: {
            data: { ok: true; user: { username: string } } | { ok: false };
          };
        }) =>
          json.result.data.ok
            ? setUsername(json.result.data.user.username)
            : undefined,
      );
  }, [token]);

  return (
    <>
      <Header>Account</Header>
      <Row>
        <div>
          <Title>{token ? 'Logged In' : 'Logged Out'}</Title>
          <SecondaryText>
            {token ? username : 'No user logged In'}
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
                (window.location.href = `https://id.innatical.com/connect?id=ea27b1df-ff32-4252-996f-65ceda9f0953&callback=${getWebUIURL(
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
