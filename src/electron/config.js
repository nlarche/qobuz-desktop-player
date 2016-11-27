import { screen } from 'electron';
import path from 'path';

export default () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  const defaultHeight = (screenSize.height * 3) / 4;
  const defaultWidth = (screenSize.width * 3) / 4;

  const baseConfig = {
    width: parseInt(defaultWidth) || 800,
    height: parseInt(defaultHeight) || 600,
    center: true,
    show: true,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname + '/../assets/18x18.png'),
    title: 'Qobuz Desktop player',
    webPreferences: {
      nodeIntegration: true,
    },
  };
  return baseConfig;
};