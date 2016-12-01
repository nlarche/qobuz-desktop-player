import { MenuItem, app } from 'electron';

export default class Action {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;

        this.isNotification = false;

        this.clickShow = this.clickShow.bind(this);
        this.clickPlayer = this.clickPlayer.bind(this);
        this.quitPlayer = this.quitPlayer.bind(this);
        this.clickNotification = this.clickNotification.bind(this);

        this.play = { label: 'play / pause', type: 'normal', click: this.clickPlayer.bind(this, "player-play-button") };
        this.previous = { label: 'Previous Track', type: 'normal', click: this.clickPlayer.bind(this, "player-previous-button") };
        this.next = { label: 'Next Track', type: 'normal', click: this.clickPlayer.bind(this, "player-next-button") };
        this.quit = { label: 'Quit', type: 'normal', click: this.quitPlayer };
        this.show = { label: 'Show', type: 'normal', click: this.clickShow };
        this.notification = new MenuItem({ label: 'Notification', type: 'checkbox', checked: false, click: this.clickNotification });
    }

    getActions() {
        return {
            play: this.play,
            previous: this.previous,
            next: this.next,
            quit: this.quit,
            show: this.show,
            notification: this.notification,
        };
    }

    clickShow() {
        this.mainWindow.focus();
        this.mainWindow.show();
    }

    clickPlayer(message) {
        this.mainWindow.webContents.send('player:action', message);
    }

    clickNotification(menuItem, browserWindow, event) {
        this.mainWindow.webContents.send('player:notification', menuItem.checked ? 'start' : 'stop');
    }

    // Need to manually handle quit to save laste state
    quitPlayer() {
        this.mainWindow.hide();
        this.mainWindow.webContents.send('player:quit');
        setTimeout(() => app.quit(), 300);
    }
}