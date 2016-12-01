import { Tray, Menu } from 'electron';

const appTray = (config, mainActions) => {
  const tray = new Tray(config.icon);

  const actions = mainActions.getActions();

  const contextMenu = Menu.buildFromTemplate([
    actions.show,
    { type: 'separator' },
    actions.play,
    actions.previous,
    actions.next,
    { type: 'separator' },
    actions.notification,
    { type: 'separator' },
    actions.quit,

  ])
  tray.setToolTip(config.title);
  tray.setContextMenu(contextMenu)

  return tray;
}


export default appTray