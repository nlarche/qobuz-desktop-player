import { screen } from 'electron';
import path from 'path';

export default () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const defaultHeight = (screenSize.height * 3) / 4;
  const defaultWidth = (screenSize.width * 3) / 4;


  const baseConfig = {
    width:  defaultWidth || 800,
    height: defaultHeight || 600,
    minWidth: 200,
    minHeight: 200,
    show: true,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname + '/../assets/icon.png'),
    title: 'Qobuz Desktop player',
    webPreferences: {
      nodeIntegration: true,
      //preload: path.resolve(`${__dirname}/../renderer/generic/index.js`),
    },
  };

  return baseConfig;
};