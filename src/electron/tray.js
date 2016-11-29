import {  app, Tray, Menu } from 'electron';

const appTray = (config, clickShow, clickPlayer) => {
  const tray = new Tray(config.icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', type: 'normal', click: clickShow },
    { type: 'separator' },
    { label: 'play / pause', type: 'normal', click: clickPlayer.bind(this, "player-play-button") },
    { label: 'Previous Track', type: 'normal', click: clickPlayer.bind(this, "player-previous-button") },
    { label: 'Next Track', type: 'normal', click: clickPlayer.bind(this, "player-next-button") },
    { type: 'separator' },
    { label: 'Quit', type: 'normal', click: () => app.quit() },
  ])
  tray.setToolTip(config.title);
  tray.setContextMenu(contextMenu)

  return tray;
}


export default appTray