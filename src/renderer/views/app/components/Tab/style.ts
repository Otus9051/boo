import styled, { css } from 'styled-components';

import { transparency, ICON_CLOSE } from '~/renderer/constants';
import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';
import { TAB_PINNED_WIDTH } from '../../constants';
import { contrast } from '~/utils/colors';

interface CloseProps {
  visible: boolean;
  theme?: ITheme;
}

export const StyledClose = styled.div<CloseProps>`
  height: 20px;
  width: 20px;
  margin-left: 2px;
  margin-right: 6px;
  border-radius: 2px;
  transition: 0.1s background-color;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  ${centerIcon(16)};

  ${({ visible, theme }) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface ActionProps {
  visible: boolean;
  theme?: ITheme;
}

export const StyledAction = styled.div<ActionProps>`
  height: 20px;
  width: 20px;
  margin-left: 2px;
  border-radius: 2px;
  transition: 0.1s background-color;
  z-index: 10;
  ${centerIcon(16)};

  ${({ visible, theme }) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
    display: ${visible ? 'block' : 'none'};
    filter: ${theme['toolbar.lightForeground'] ? 'invert(100%)' : 'none'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface PinActionProps {
  visible: boolean;
  theme?: ITheme;
}

export const StyledPinAction = styled.div<PinActionProps>`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  transition: 0.1s background-color;
  z-index: 10;
  position: fixed;
  right: 8px;
  top: 8px;
  ${centerIcon(10)};

  ${({ visible, theme }) => css`
    display: ${visible ? 'block' : 'none'};
    background-color: ${theme['toolbar.lightForeground']
      ? 'rgb(255, 255, 255)'
      : 'rgb(0, 0, 0)'};
  `}

  &:hover {
    filter: invert(100%);
  }
`;

interface TabProps {
  selected: boolean;
}

export const StyledTab = styled.div<TabProps>`
  position: absolute;
  height: 100%;
  width: 0;
  left: 0;
  will-change: width, transform;
  -webkit-app-region: no-drag;
  display: flex;
  backface-visibility: hidden;

  ${({ selected }) => css`
    z-index: ${selected ? 2 : 1};
  `};
`;

interface TitleProps {
  isIcon: boolean;
  selected: boolean;
  theme?: ITheme;
}

export const StyledTitle = styled.div<TitleProps>`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.2s margin-left;

  min-width: 0;
  flex: 1;
`;

interface IconProps {
  isIconSet: boolean;
}
export const StyledIcon = styled.div<IconProps>`
  height: 16px;
  min-width: 16px;
  transition: 0.2s opacity, 0.2s min-width;
  margin-right: 8px;
  ${centerIcon()};
  ${({ isIconSet }) => css`
    min-width: ${isIconSet ? 0 : 16},
    opacity: ${isIconSet ? 0 : 1};
  `};
`;

export const StyledContent = styled.div`
  overflow: hidden;
  z-index: 2;
  align-items: center;
  display: flex;
  margin-left: 10px;
  flex: 1;
`;

interface TabContainerProps {
  pinned: boolean;
  theme?: ITheme;
  hasTabGroup: boolean;
  selected?: boolean;
  color?: string;
}

export const TabContainer = styled.div<TabContainerProps>`
  position: relative;

  width: 100%;
  align-items: center;
  overflow: hidden;
  display: flex;
  backface-visibility: hidden;
  transition: 0.1s background-color;
  border-bottom: transparent !important;
  /* border: 2px solid; */

  ${({ color, theme, selected }) => {
    if (color && color !== '') {
      const cc = contrast(color);

      const isDarkMode = theme['toolbar.lightForeground'];
      switch (cc) {
        case 'dark':
          if (isDarkMode) {
            if (selected) {
              return css`
                background-color: rgb(255, 255, 255, 0.2);
                color: #fff;
              `;
            }
            return css`
              background-color: rgb(255, 255, 255, 0.1);
              color: #fff;
            `;
          } else {
            if (selected) {
              return css`
                background-color: rgb(255, 255, 255, 0.2);
                color: #fff;
              `;
            }
            return css`
              background-color: rgb(255, 255, 255, 0.1);
              color: #e5e5e5;
            `;
          }
        case 'light': {
          if (isDarkMode) {
            if (selected) {
              return css`
                background-color: rgb(0, 0, 0, 0.15);
              `;
            }
            return css`
              background-color: rgb(0, 0, 0, 0.06);
              color: #000;
            `;
          } else {
            if (selected) {
              return css`
                background-color: rgb(0, 0, 0, 0.15);
              `;
            }
            return css`
              background-color: rgb(0, 0, 0, 0.06);
            `;
          }
        }
      }
    }
    return css`
      color: ${theme['addressbar.textColor']};
      background-color: ${selected
        ? theme['tab.selected.backgroundColor']
        : theme['tab.backgroundColor']};
    `;
  }}

  ${({ pinned, theme, hasTabGroup, selected, color }) => css`
    max-width: ${pinned ? `${TAB_PINNED_WIDTH}px` : '100%'};

    /* background-color: ${color
      ? selected
        ? theme['toolbar.lightForeground']
          ? 'rgb(255,255,255,0.20)'
          : 'rgb(0,0,0,0.15) '
        : theme['toolbar.lightForeground']
        ? 'rgb(255,255,255,0.10)'
        : 'rgb(0,0,0,0.05) '
      : selected
      ? theme['tab.selected.backgroundColor']
      : theme['tab.backgroundColor']}; */

    height: ${theme.tabHeight}px;
    border-radius: ${theme.isCompact && !hasTabGroup ? '8px' : 'auto'};
    border-radius: 8px;
    transition: background-color 0.4s, color 0.4s;
    transition-timing-function: ease-out;
  `};
`;
