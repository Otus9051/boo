import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { StyledNavigationDrawerItem, Icon } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const NavigationDrawerItem = observer(
  ({
    children,
    selected,
    onClick,
    icon,
    global,
  }: {
    children: any;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    icon?: IconProp;
    global?: boolean;
  }) => {
    return (
      <StyledNavigationDrawerItem
        title={children}
        onClick={onClick}
        selected={selected}
        global={global}
      >
        {icon && (
          <Icon>
            <FontAwesomeIcon icon={icon} fixedWidth />
          </Icon>
        )}
        {children}
      </StyledNavigationDrawerItem>
    );
  },
);
