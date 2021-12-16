import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';

export const Line = styled.div`
  height: 1px;
  width: 100%;
  z-index: 100;
  position: relative;
  background-color: black;
`;

interface StyledAppProps {
  modalOpen: boolean;
}

export const StyledApp = styled.div<StyledAppProps>`
  display: flex;
  flex-flow: column;
  background-color: #fff;
  ${({ modalOpen }) =>
    css`
      -webkit-app-region: ${modalOpen ? 'no-drag' : 'drag'};
    `}
`;
