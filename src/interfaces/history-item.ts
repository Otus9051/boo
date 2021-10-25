import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IHistoryItem {
  _id?: string;
  title?: string;
  url?: string;
  date?: number;
  color?: string;
  favicon?: string | IconProp;
  hovered?: boolean;
}

export interface IVisitedItem extends IHistoryItem {
  times: number;
}
