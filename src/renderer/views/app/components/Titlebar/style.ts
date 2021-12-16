import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';
import { platform } from 'os';
import { ICON_FULLSCREEN_EXIT } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins';

interface TitlebarProps {
  isFullscreen: boolean;
  theme: ITheme;
  modalOpen: boolean;
}

export const StyledTitlebar = styled.div<TitlebarProps>`
  position: relative;
  z-index: 100;
  display: flex;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;

  &:before {
    position: absolute;
    z-index: 0;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 0;
    content: '';
  }

  ${({ isFullscreen, theme, color, modalOpen }) => css`
    background-color: ${color ? color : theme['titlebar.backgroundColor']};
    height: 45px;
    align-items: ${theme.isCompact ? 'center' : 'initial'};

    &:before {
      -webkit-app-region: ${isFullscreen || modalOpen ? 'no-drag' : 'drag'};
    }
  `};

  transition: background-color 0.4s, color 0.4s;
  transition-timing-function: ease-out;
`;

interface FullscreenExistButtonProps {
  theme?: ITheme;
}

export const FullscreenExitButton = styled.div<FullscreenExistButtonProps>`
  top: 0;
  right: 0;
  height: 45px;
  margin-bottom: 5px;
  min-width: 45px;
  -webkit-app-region: no-drag;
  margin-left: 8px;
  transition: 0.1s background-color;
  ${centerIcon(24)};

  ${({ theme }) => css`
    color: ${theme['toolbar.lightForeground'] ? '#DEDEDE' : '#323232'};
    /* filter: ${theme['dialog.lightForeground'] ? `invert(100%)` : `none`}; */
  `}

  &:hover {
    background-color: rgba(60, 60, 60, 0.4);
  }
`;
