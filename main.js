const { app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const notifier = require('node-notifier')

let tray, timeId




function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Start',
      submenu: [0.1, 10, 15, 30, 60, 90, 120, 150, 180, 240, "Stop"].map((minute) => {
        if (minute === "Stop") {
          return {
            label: minute,
            click: () => {
              console.log("Stop asking")
              clearInterval(timeId)
            }
          }
        }
        return {
          label: `${minute} minutes`,
          click: () => {
            console.log(`Set to ${minute} minutes`)
            clearInterval(timeId)
            timeId = setInterval(() => {
              showNotification()
            }, minute * 60 * 1000)
          }
        }
      }),
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('My Electron App')
  tray.setContextMenu(contextMenu)
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
      // if (metadata.activationType === 'clicked') {
      //     app.whenReady().then(() => {
      //         createWindow()
      //     })
      //     return; // No need to continue
      // }
      const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })
      newWindow.loadFile(path.join(__dirname, 'index.html'))
      newWindow.on('ready-to-show', () => {
        newWindow.show()
      })
      
      // Add an event listener for the close event of the window
      newWindow.on('close', (event) => {
        event.preventDefault() // Prevent the default behavior of the event
        newWindow.hide() // Hide the window instead of closing it
      })

    } else if (response === 'dismissed') {
      console.log('Notification closed')
    }
  })
}


timeId = setTimeout(() => {
  showNotification()
}, 3000)

app.on('ready', () => {
  createTray()
})

