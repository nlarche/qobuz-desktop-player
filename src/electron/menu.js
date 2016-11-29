import { Menu, shell } from 'electron';

const appMenu = (config, clickPlayer, quitPlayer) => {
  const menu = new Menu()
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Player',
      submenu: [
        { label: 'play / pause', type: 'normal', click: clickPlayer.bind(this, "player-play-button") },
        { label: 'Previous Track', type: 'normal', click: clickPlayer.bind(this, "player-previous-button") },
        { label: 'Next Track', type: 'normal', click: clickPlayer.bind(this, "player-next-button") },
      ]
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: 'Quit', type: 'normal', click: quitPlayer , accelerator: 'CmdOrCtrl+Q', }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Issues',
          click: () => shell.openExternal('https://github.com/nlarche/qobuz-desktop-player/issues'),
        },       
        {
          label: 'Learn More',
          click: () => shell.openExternal('https://github.com/nlarche/qobuz-desktop-player'),
        },
        { label: `Version ${config.version}` },
      ]
    }
  ])
  Menu.setApplicationMenu(contextMenu)
  
  return menu;
}

export default appMenu;