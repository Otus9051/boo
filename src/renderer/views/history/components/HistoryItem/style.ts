import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { ICON_CLOSE } from '~/renderer/constants/icons';
import { RED_500 } from '~/renderer/constants';

export const Remove = styled.div`
  height: 16px;
  width: 16px;
  cursor: pointer;
  color: ${RED_500};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.54;
  ${centerIcon()};
  &:hover {
    opacity: 1;
  }
`;

export const Favicon = styled.div`
  ${centerIcon()};
  height: 16px;
  width: 16px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.a`
  white-space: nowrap;
  width: fit-content;
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TitleContainer = styled.div`
  flex: 2;
  margin-right: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Site = styled.div`
  flex: 1;
  opacity: 0.54;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Time = styled.div`
  opacity: 0.54;
  margin-left: 16px;
  margin-right: 32px;
`;
