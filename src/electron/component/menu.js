import { Menu, shell } from 'electron';

const appMenu = (config, mainActions) => {
  const menu = new Menu();
  
  const actions = mainActions.getActions();
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Player',
      submenu: [
        actions.play,
        actions.previous,
        actions.next,
      ]
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        actions.quit
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