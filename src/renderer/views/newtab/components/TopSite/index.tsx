import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Item, Icon, Title } from './style';
import { IHistoryItem } from '~/interfaces';
import store from '../../store';
import { ICON_PAGE } from '~/renderer/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const onClick = (url: string) => () => {
  if (url !== '' && url != null) {
    window.location.href = url;
  }
};

export const TopSite = observer(
  ({
    item,
    backgroundColor,
  }: {
    item?: IHistoryItem;
    backgroundColor: string;
  }) => {
    const { title, favicon, url } = item || {};
    const custom = favicon === '' || favicon == null;

    let fav: string | IconProp = ICON_PAGE;

    if (!custom) {
      fav = favicon;
    }

    return (
      <Item
        imageSet={store.imageVisible}
        onClick={onClick(url)}
        backgroundColor={backgroundColor}
      >
        <Icon
          imageSet={store.imageVisible}
          custom={custom}
          icon={typeof fav === 'string' ? fav : ''}
        >
          {typeof fav !== 'string' && <FontAwesomeIcon icon={fav} />}
        </Icon>
        {title && <Title>{title}</Title>}
      </Item>
    );
  },
);
