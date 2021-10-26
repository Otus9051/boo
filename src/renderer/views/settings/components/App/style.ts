import styled, { css } from 'styled-components';

import { interMedium, centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

export const Title = styled.div`
  font-size: 14px;
  ${interMedium()};
`;

export const Header = styled.div`
  margin-top: 4px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

interface RowProps {
  theme?: ITheme;
}

export const Row = styled.div<RowProps>`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 70px;

  cursor: pointer;
  &:last-of-type {
    border: none;
  }

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme['control.borderBottomColor']};
  `}
`;

export const Control = styled.div`
  margin-left: auto;
`;

export const SecondaryText = styled.div`
  opacity: 0.54;
  font-weight: 400;
  margin-top: 4px;
  font-size: 12px;
`;
interface IconButtonProps {
  theme?: ITheme;
}

export const IconButton = styled.div<IconButtonProps>`
  border-radius: 4px;
  cursor: pointer;
  width: 38px;
  height: 38px;
  ${centerIcon(24)};
  opacity: 0.7;

  svg {
    margin-right: 10px;
  }

  ${({ theme }) => css`
    color: ${theme['toolbar.lightForeground'] ? '#DEDEDE' : '#323232'};
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `}
`;

export const Back = styled(IconButton)`
  position: absolute;
  left: -48px;
`;
