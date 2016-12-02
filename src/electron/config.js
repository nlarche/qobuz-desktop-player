import { screen, app } from 'electron';
import path from 'path';
import Config  from 'electron-config';

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
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
    },
    version : app.getVersion(),
    settings : new Config()
  };
  return baseConfig;
};