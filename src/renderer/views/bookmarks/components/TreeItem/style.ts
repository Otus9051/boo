import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';
import { ICON_FOLDER, ICON_DROPDOWN } from '~/renderer/constants/icons';
import { ITheme } from '~/interfaces';

interface TreeItemProps {
  theme?: ITheme;
  selected: boolean;
}

export const StyledTreeItem = styled.div<TreeItemProps>`
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 4px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;

  ${({ theme, selected }) => css`
    &:hover {
      background-color: ${theme['backgroundColor']};
    }

    background-color: ${selected ? theme['backgroundColor'] : 'none'};
  `}
`;

interface DropIconProps {
  theme?: ITheme;
  visible: boolean;
  expanded: boolean;
}

export const DropIcon = styled.div<DropIconProps>`
  min-width: 24px;
  min-height: 24px;
  margin: 0 2px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${centerIcon(20)};
  ${({ visible, expanded, theme }) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
    filter: ${theme['pages.lightForeground'] ? 'invert(100%)' : ''};

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      opacity: ${visible ? 1 : 0};
    }
  `}
`;

interface FolderIconProps {
  theme?: ITheme;
}

export const FolderIcon = styled.div<FolderIconProps>`
  min-width: 24px;
  min-height: 24px;
  opacity: ${transparency.icons.inactive};
  display: flex;
  align-items: center;
  justify-content: center;
  ${centerIcon(20)}

  ${({ theme }: FolderIconProps) => css`
    color: ${theme['accentColor'] ? 'invert(100%)' : ''};
  `}
`;

export const Label = styled.div`
  font-size: 13px;
  margin-left: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
