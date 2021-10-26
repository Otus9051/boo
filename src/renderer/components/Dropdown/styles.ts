import styled, { css } from 'styled-components';

import {
  EASING_FUNCTION,
  transparency,
  ICON_DROPDOWN,
} from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

interface DropdownProps {
  theme: ITheme;
}

export const StyledDropdown = styled.div<DropdownProps>`
  height: 40px;
  min-width: 200px;
  position: relative;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme['control.backgroundColor']};

    &:hover {
      background-color: ${theme['control.hover.backgroundColor']};
    }
  `}
`;

interface LabelProps {
  theme: ITheme;
}

export const Label = styled.div<LabelProps>`
  font-size: 13px;
  margin-left: 8px;
  pointer-events: none;

  ${({ theme }) => css`
    color: ${theme['control.valueColor']};
  `}
`;

interface DropIconProps {
  expanded: boolean;
  theme?: ITheme;
}

export const DropIcon = styled.div<DropIconProps>`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 2px;
  opacity: ${transparency.icons.inactive};
  transition: 0.2s ${EASING_FUNCTION} transform;
  ${centerIcon(24)};

  ${({ expanded, theme }) => css`
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    filter: ${theme['control.lightIcon'] ? 'invert(100%)' : 'unset'};
  `}
`;
