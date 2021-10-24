export interface IHistoryItem {
  _id?: string;
  title?: string;
  url?: string;
  date?: number;
  color?: string;
  favicon?: string;
  hovered?: boolean;
}

export interface IVisitedItem extends IHistoryItem {
  times: number;
}
