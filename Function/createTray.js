


function createTray(timeId, settings, dialog, app, BrowserWindow, Menu, path, Tray, notifier, showNotification) {
    let tray = new Tray(path.join(__dirname, 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Start',
        submenu: [0.2, 10, 15, 30, 60, 90, 120, 150, 180, 240, "Stop"].map((minute) => {
          settings.set("setting", { minute: minute })
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
                showNotification(notifier, path, BrowserWindow)
              }, minute * 60 * 1000)
            }
          }
        }),
      },
      {
        label: 'quit',
        click: () => {
          const choice = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['Yes', 'No'],
            defaultId: 1,
            title: 'Confirm',
            message: 'Are you sure you want to quit?'
          });
      
          if (choice === 0) {
            const windows = BrowserWindow.getAllWindows();
            windows.forEach(window => {
              window.close();
            });
            clearInterval(timeId)
            app.quit(); // quit the app
          }
        }
      }
    ])
  
    tray.setToolTip('MindResetter')
    tray.setContextMenu(contextMenu)
}

module.exports = createTray