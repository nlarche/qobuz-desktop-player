import { screen } from 'electron';
import path from 'path';
import packageJson from '../../package.json';

export default () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  const platform = process.platform;
  const env = platform === 'darwin' ? 'mac' : platform === 'win32' ? 'win' : 'linux';

  const ImagePath = '/../assets/' + env;

  const defaultHeight = (screenSize.height * 3) / 4;
  const defaultWidth = (screenSize.width * 3) / 4;

  const baseConfig = {
    width: parseInt(defaultWidth) || 800,
    height: parseInt(defaultHeight) || 600,
    center: true,
    show: true,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname + ImagePath + '/icon.png'),
    title: 'Qobuz Desktop player',
    webPreferences: {
      nodeIntegration: true,
    },
    version : packageJson.version
  };
  return baseConfig;
};