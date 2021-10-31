import { VIEW_Y_OFFSET } from '~/constants/design';
import {PersistentDialog} from "~/main/dialogs/dialog";

const WIDTH = 350;
const HEIGHT = 271;

export class CredentialsDialog extends PersistentDialog {
  public constructor() {
    super({
      name: 'credentials',
      bounds: {
        height: HEIGHT,
        width: WIDTH,
        y: VIEW_Y_OFFSET,
      },
    });
  }

  public rearrange() {
    const { width } = this.browserWindow.getContentBounds();
    super.rearrange({
      x: width - WIDTH,
    });
  }
}
