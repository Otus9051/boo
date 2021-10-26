import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { centerVertical } from '~/renderer/mixins';

interface SwitchProps {
  activated: boolean;
  color: string;
  theme: ITheme;
  clickable: boolean;
  dense: boolean;
}

export const StyledSwitch = styled.div<SwitchProps>`
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  transition: 0.15s background-color;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  ${({ activated, color, theme, clickable, dense }) => css`
    background-color: ${activated ? color : theme['switch.backgroundColor']};
    cursor: ${clickable ? 'pointer' : 'default'};
    width: ${dense ? 32 : 42}px;
    height: ${dense ? 16 : 25}px;

    &:hover {
      &:after {
        background-color: ${!activated && theme.dark
          ? 'rgba(0, 0, 0, 0.06)'
          : 'rgba(255, 255, 255, 0.12)'};
      }
    }
  `}
`;

interface ThumbProps {
  activated: boolean;
  dense: boolean;
}
export const Thumb = styled.div<ThumbProps>`
  border-radius: 100%;
  position: absolute;
  z-index: 3;
  transition: 0.15s left;
  ${centerVertical()};

  ${({ activated, dense }) => css`
    width: ${dense ? 12 : 14}px;
    height: ${dense ? 12 : 14}px;
    left: ${activated ? (dense ? 18 : 22) : 5}px;
    background-color: #fff;
  `}
`;
