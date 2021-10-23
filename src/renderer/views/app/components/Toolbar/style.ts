import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { platform } from 'os';

export interface ToolbarProps {
  isFullscreen: boolean;
  theme: ITheme;
}

export const StyledToolbar = styled.div<ToolbarProps>`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  justify-content: center;
  ${({ isFullscreen, theme }) => css`
    background-color: ${theme['titlebar.backgroundColor']};
    align-items: ${theme.isCompact ? 'center' : 'initial'};
    padding-left: ${platform() === 'darwin' && !isFullscreen ? 78 : 4}px;
    padding-top: 10px;
    padding-bottom: 10px;
    &:before {
      -webkit-app-region: ${isFullscreen ? 'no-drag' : 'drag'};
    }
  `};
`;
