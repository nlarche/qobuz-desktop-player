export default class QobuzNotification {
    constructor() {
        this.lastParent = undefined;
        this.notification = undefined;
        this.init()
    }
    init() {
        setInterval(() => {
            var parent = document.getElementById("now-playing");
            // is playing
            var playBtn = document.getElementById("player-play-button").getElementsByClassName('ui-icon-pause');
            if (playBtn.length > 0) {
                var parsedHtml = this.parseChild(parent);

                if (!this.ArrayEquals(parsedHtml, this.lastParent)) {
                    this.lastParent = parsedHtml;
                    this.getNotification(parsedHtml);
                }
            }
        }, 4000);
    }

    ArrayEquals(arr, arr1) {
        if (!arr) {
            // no current, no Notification
            return true;
        }
        if (!arr[1]) {
            // no current, no Notification
            return true;
        }
        if (!arr1) {
            return false;
        }
        return arr[1] === arr1[1] && arr[2] === arr1[2] && arr[3] === arr1[3] && arr[4] === arr1[4]
    }

    getNotification(parent) {
        if (Notification.permission === "granted") {
            if (this.notification) {
                this.notification.close();
            }
            this.notification = new window.Notification(parent[2], { body: parent[3] + "\n" + parent[4], icon: parent[1] });
            setTimeout(this.notification.close.bind(this.notification), 1000);
        }
    }

    parseChild(node) {
        var info = [];
        if (node.localName === 'a') {
            info.push(node.innerHTML);
        } else if (node.localName === 'img') {
            info.push(node.src);
        } else if (node.childNodes.length > 0) {
            node.childNodes.forEach((childNode) => {
                var child = this.parseChild(childNode);
                if (child.length > 0) {
                    if (info.length === 0) {
                        info = child;
                    } else {
                        Array.prototype.push.apply(info, child);
                    }
                }
            });
        }
        return info;
    }
}
