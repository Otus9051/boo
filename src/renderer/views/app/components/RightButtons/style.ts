import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

interface SeperatorProps {
  theme?: ITheme;
}
export const Separator = styled.div<SeperatorProps>`
  height: 16px;
  width: 1px;
  margin-left: 4px;
  margin-right: 4px;

  ${({ theme }) => css`
    background-color: ${theme['toolbar.separator.color']};
  `};
`;
