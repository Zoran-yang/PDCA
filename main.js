const { app, BrowserWindow } = require('electron')
const path = require('path')
const notifier = require('node-notifier')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    })
  
    win.loadFile('index.html')
}

function showNotification() {
    notifier.notify({
      title: 'What are you doing?',
      message: 'Would you tell us what you are doing?',
      icon: path.join(__dirname, 'Icon.png'),
      sound: true,
      timeout: 10,
      reply: true,
    }, (err, response, metadata) => {
      if (response === 'activate') {
        if (err) throw err;
        if (metadata.activationType === 'clicked') {
            app.whenReady().then(() => {
                createWindow()
            })
            return; // No need to continue
        }
      } else if (response === 'dismissed') {
        console.log('Notification closed')
      }
    })
}

setTimeout(() => {
    showNotification()
}, 2000)

