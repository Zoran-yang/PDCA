const settings = require("electron-settings");

async function createTray(
  timeId,
  settings,
  dialog,
  app,
  BrowserWindow,
  Menu,
  path,
  Tray,
  notifier,
  showNotification
) {
  let tray = new Tray(path.join(__dirname, "icon.png"));
  let startingTime = (await settings.get("startingTime")) || "From Now";
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Choose Frequency And Start",
      submenu: [0.2, 10, 15, 30, 60, 90, 120, 150, 180, 240, "Stop"].map(
        (minute) => {
          settings.set("setting", { minute: minute });
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
              setTimer(minute, startingTime);
            },
          };
        }
      ),
    },
    {
      label: "Choose Start Time",
      submenu: ["From Now", "From o'clock", "From o'clock or half"].map(
        (startTime) => {
          settings.set("setting", { startTime: startTime });
          return {
            label: startTime,
            click: () => {
              console.log(`Set to ${startTime}`);
              startingTime = startTime;
            },
          };
        }
      ),
    },
    {
      label: "quit",
      click: () => {
        const choice = dialog.showMessageBoxSync({
          type: "question",
          buttons: ["Yes", "No"],
          defaultId: 1,
          title: "Confirm",
          message: "Are you sure you want to quit?",
        });

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

function setTimer(minute, startingTime) {
  const now = new Date();
  const Start = chooseStart(startingTime);
  console.log(`Set to ${minute} minutes`);
  clearInterval(timeId);
  timeId = setTimeout(() => {
    showNotification(notifier, path, BrowserWindow);
    timeId = setInterval(() => {
      showNotification(notifier, path, BrowserWindow);
    }, minute * 60 * 1000);
  }, Start.getTime() - now.getTime());
}

function chooseStart(startingTime) {
  switch (startingTime) {
    case "From Now":
      return now;
    case "From o'clock":
      return getLatestOclock(now);
    case "From o'clock or half":
      return getLatestOclockOrHalf(now);
    default:
      return now;
  }
}

function getLatestOclock(date) {
  // Set the time to the latest o'clock by rounding the hours up to the nearest integer
  date.setHours(Math.ceil(date.getHours()));
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // Return the new date object
  return date;
}

function getLatestOclockOrHalf(date) {
  // Round up the hours to the nearest integer
  const hours = Math.round(date.getHours());
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // If the minutes are greater than or equal to 30, add 30 minutes to get the half past time
  if (date.getMinutes() >= 30) {
    date.setHours(hours, 0, 0, 0);
  } else {
    date.setHours(hours, 30, 0, 0);
  }
  // Return the new date object
  return date;
}
