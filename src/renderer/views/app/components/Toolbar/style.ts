import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { TOOLBAR_HEIGHT } from '~/constants/design';
import { platform } from 'os';

export const StyledToolbar = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  justify-content: center;
  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme['titlebar.backgroundColor']};
  `};

  ${({
    isHTMLFullscreen,
    isFullscreen,
    theme,
  }: {
    isHTMLFullscreen: boolean;
    isFullscreen: boolean;
    theme: ITheme;
  }) => css`
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
