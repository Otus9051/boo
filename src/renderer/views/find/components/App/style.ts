import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { ICON_SEARCH } from '~/renderer/constants';
import {
  DIALOG_BOX_SHADOW,
  DIALOG_BORDER_RADIUS,
} from '~/renderer/mixins/dialogs';

export const StyledApp = styled.div`
  margin: 16px;
  margin-top: 3px;
  box-shadow: ${DIALOG_BOX_SHADOW};
  border-radius: ${DIALOG_BORDER_RADIUS}px;
  background: white;

  ${({ theme }: { theme?: ITheme }) => css`
    background-color: ${theme['dialog.backgroundColor']};
    color: ${theme['dialog.lightForeground'] ? 'white' : 'black'};
  `}
`;

export const StyledFind = styled.div`
  border-radius: 30px;
  height: 40px;
  -webkit-app-region: no-drag;
  align-items: center;
  overflow: hidden;
  display: flex;
`;

export const SearchIcon = styled.div`
  min-width: 16px;
  height: 16px;
  ${centerIcon()};
  margin-left: 12px;
  opacity: 0.54;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme?: ITheme }) => css`
    color: ${theme['dialog.lightForeground'] ? 'white' : 'black'};
  `}
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 13px;
  margin-right: 8px;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 8px;
  color: inherit;
`;

export const Button = styled.div`
  ${({ size, theme }: { size: number; theme?: ITheme }) => css`
    ${centerIcon(size)};
    color: ${theme['dialog.lightForeground'] ? 'white' : 'black'};
  `}

  width: 24px;
  height: 24px;
  opacity: 0.54;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    background-color: rgba(0, 0, 0, 0.08);
    content: '';
    position: absolute;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: 0.2s opacity;
  }

  &:hover {
    opacity: 1;
    &:after {
      opacity: 1;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-right: 8px;
`;

export const Occurrences = styled.div`
  opacity: 0.54;
  margin-right: 4px;
`;
