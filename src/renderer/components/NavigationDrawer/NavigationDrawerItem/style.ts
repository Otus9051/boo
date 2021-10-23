import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { transparency } from '~/renderer/constants';

interface NavigationDrawerItemProps {
  theme?: ITheme;
  global?: boolean;
}
export const StyledNavigationDrawerItem = styled.div<NavigationDrawerItemProps>`
  display: flex;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  position: relative;
  cursor: pointer;
  ${({ theme, global }) => css`
    &:hover {
      background-color: ${theme['backgroundColor']};
    }
    justify-content: ${global ? 'center' : 'left'};
  `};
`;

export const Icon = styled.div`
  height: 24px;
  opacity: ${transparency.icons.inactive};
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${centerIcon(20)};
`;
