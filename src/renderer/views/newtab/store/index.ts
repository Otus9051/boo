import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme, IVisitedItem } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { DEFAULT_SETTINGS } from '~/constants';

export class Store {
  @observable
  public settings: ISettings = { ...(window as any).settings };

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  @observable
  public topSites: IVisitedItem[] = [];

  public updateSettings(newSettings: ISettings) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public constructor() {
    makeObservable(this);

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };

    this.loadImage();

    this.loadTopSites();
  }

  public async loadImage() {
    let url = this.settings.tab.image;
    let isNewUrl = false;

    if (!url || url == '') {
      url = 'https://file.coffee/u/y970mT9Cg5NkPg.png';
      isNewUrl = true;
    }
  }

  public async loadTopSites() {
    this.topSites = await (window as any).getTopSites(8);
  }
}

export default new Store();
