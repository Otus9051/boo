import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { transparency } from '~/renderer/constants';

export const StyledNavigationDrawerItem = styled.div`
  /* padding: 4px 16px; */
  display: flex;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  position: relative;
  cursor: pointer;
  ${({ theme, global }: { theme?: ITheme; global?: boolean }) => css`
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

  ${({ theme }: { theme?: ITheme }) => css``};
`;
