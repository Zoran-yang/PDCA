const { app } = require("electron");
const createTray = require("./Function/createTray.js");
const intialNotification = require("./Function/showIntialNotification.js");
const settings = require("electron-settings");
const setTimer = require("./Function/setTimer.js");
const showNotification = require("./Function/showNotification.js");

async function main() {
  const timerObj = { timeId: null };
  // let minuteSetting = (await settings.get("setting.minute")) || 15; // default 15 minutes
  // let minuteSetting = (await settings.get("setting.minute")) || 0.2 // for debug
  let settingObj = await settings.get("setting");
  if (!settingObj || !settingObj.minute || !settingObj.startTime) {
    settingObj = {
      minute: "Stop",
      startTime: "From Now",
    };
    await settings.set("setting", settingObj);
  }
  console.log("main", "settingObj", settingObj);
  // show notification when app is started
  intialNotification(settingObj.minute);
  // set timer
  timerObj.timeId = setTimer(timerObj, settingObj, showNotification);
  // create tray
  createTray(timerObj, settingObj);
}

// auto start when login
app.setLoginItemSettings({ openAtLogin: true });
// launch app when app is ready
app.on("ready", async () => {
  console.log("app is ready");
  main();
});
