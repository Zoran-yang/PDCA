const { app, BrowserWindow, Menu, Tray, dialog } = require("electron");
const path = require("path");
const settings = require("electron-settings");
const showNotification = require("./showNotification.js");
const setTimer = require("./setTimer.js");

async function createTray(timerObj, settingObj) {
  let tray = new Tray(path.join(__dirname, "../Asset/Icon.png"));
  // set main menu
  const menu = [
    // set frequency
    {
      label: "Choose Frequency And Start",
      submenu: [0.2, 10, 15, 30, 60, 90, 120, 150, 180, 240, "Stop"].map(
        (min) => {
          // stop timer
          if (min === "Stop") {
            return {
              label: min,
              click: () => {
                settingObj.minute = min;
                // save setting
                settings.set("setting", settingObj);
                console.log("Stop asking");
                clearInterval(timerObj.timeId);
              },
            };
          }

          return {
            label: `${min} minutes`,
            click: async () => {
              settingObj.minute = min;
              await settings.set("setting", settingObj);
              timerObj.timeId = setTimer(
                timerObj,
                settingObj,
                showNotification
              );
            },
          };
        }
      ),
    },
    // set Start Time
    {
      label: "Choose Start Time",
      submenu: [
        "Start From Now",
        "Start From Next O'clock",
        "Start From Next O'clock Or Half",
        "Start From Next Quarter Hour",
      ].map((startTime) => {
        // save setting

        return {
          label: startTime,
          click: async () => {
            console.log(`Set to ${startTime}`);
            settingObj.startTime = startTime;
            await settings.set("setting", settingObj);
            timerObj.timeId = setTimer(timerObj, settingObj, showNotification);
          },
        };
      }),
    },
    // Add user task info
    {
      label: "Add A New Task",
      click: () => {
        const newWindow = new BrowserWindow({
          width: 700,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        newWindow.loadFile(
          path.join(__dirname, "../APP/AddUserInfo/dist", "index.html")
        );
        newWindow.on("ready-to-show", () => {
          newWindow.show();
        });

        // Add an event listener for the close event of the window
        newWindow.on("close", (event) => {
          event.preventDefault(); // Prevent the default behavior of the event
          newWindow.hide(); // Hide the window instead of closing it
        });
      },
    },
    // build SOP
    {
      label: "Build My Own SOP",
      click: () => {
        const newWindow = new BrowserWindow({
          width: 700,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        newWindow.loadFile(
          path.join(__dirname, "../APP/BuildSOP/dist", "index.html")
        );
        newWindow.on("ready-to-show", () => {
          newWindow.show();
        });

        // Add an event listener for the close event of the window
        newWindow.on("close", (event) => {
          event.preventDefault(); // Prevent the default behavior of the event
          newWindow.hide(); // Hide the window instead of closing it
        });
      },
    },
    // revise SOP
    {
      label: "Revise My SOP",
      click: () => {
        const newWindow = new BrowserWindow({
          width: "100%",
          height: "100%",
          webPreferences: {
            nodeIntegration: true,
          },
        });
        newWindow.loadFile(
          path.join(__dirname, "../APP/reviseUserInfo/dist", "index.html")
        );
        newWindow.on("ready-to-show", () => {
          newWindow.show();
        });
        // Add an event listener for the close event of the window
        newWindow.on("close", (event) => {
          event.preventDefault(); // Prevent the default behavior of the event
          newWindow.hide(); // Hide the window instead of closing it
        });
      },
    },
    // close app
    {
      label: "Quit",
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
          clearInterval(timerObj.timeId);
          app.quit(); // quit the app
        }
      },
    },
  ];
  // create context menu
  const contextMenu = Menu.buildFromTemplate(menu);
  tray.setToolTip("MindResetter");
  tray.setContextMenu(contextMenu);
}

module.exports = createTray;
