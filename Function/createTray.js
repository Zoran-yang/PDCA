const { app, BrowserWindow, Menu, Tray, dialog } = require("electron");
const path = require("path");
const settings = require("electron-settings");
const showNotification = require("./showNotification.js");

async function createTray(timeId) {
  let tray = new Tray(path.join(__dirname, "icon.png"));
  let startingTime = (await settings.get("setting.startTime")) || "From Now";
  let minuteSetting = (await settings.get("setting.minute")) || 15; // default 15 minutes
  // create context menu
  const contextMenu = Menu.buildFromTemplate([
    // set frequency
    {
      label: "Choose Frequency And Start",
      submenu: [0.2, 10, 15, 30, 60, 90, 120, 150, 180, 240, "Stop"].map(
        (minute) => {
          // save setting
          settings.set("setting", { minute: minute });
          // stop timer
          if (minute === "Stop") {
            return {
              label: minute,
              click: () => {
                console.log("Stop asking");
                clearInterval(timeId);
              },
            };
          }

          return {
            label: `${minute} minutes`,
            click: () => {
              minuteSetting = minute;
              setTimer(minuteSetting, startingTime, showNotification);
            },
          };
        }
      ),
    },
    // set Start Time
    {
      label: "Choose Start Time",
      submenu: ["From Now", "From o'clock", "From o'clock or half"].map(
        (startTime) => {
          // save setting
          settings.set("setting", { startTime: startTime });
          return {
            label: startTime,
            click: () => {
              console.log(`Set to ${startTime}`);
              startingTime = startTime;
              setTimer(minuteSetting, startingTime, showNotification);
            },
          };
        }
      ),
    },
    // close app
    {
      label: "quit",
      click: () => {
        // show confirm dialog for double check
        const choice = dialog.showMessageBoxSync({
          type: "question",
          buttons: ["Yes", "No"],
          defaultId: 1,
          title: "Confirm",
          message: "Are you sure you want to quit?",
        });
        // quit the app
        if (choice === 0) {
          const windows = BrowserWindow.getAllWindows();
          windows.forEach((window) => {
            window.close();
          });
          clearInterval(timeId);
          app.quit(); // quit the app
        }
      },
    },
  ]);

  tray.setToolTip("MindResetter");
  tray.setContextMenu(contextMenu);
}

module.exports = createTray;
