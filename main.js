const { app } = require("electron");
const createTray = require("./Function/createTray.js");
const intialNotification = require("./Function/showIntialNotification.js");
const settings = require("electron-settings");
const setTimer = require("./Function/setTimer.js");
const showNotification = require("./Function/showNotification.js");

async function main() {
  const timerObj = { timeId: null };
  // let minuteSetting = (await settings.get("setting.minute")) || 15; // default 15 minutes
  let minuteSetting = (await settings.get("setting.minute")) || 0.2; // for debug
  let startingTime = (await settings.get("setting.startTime")) || "From Now";

  intialNotification(minuteSetting);
  // set timer
  timerObj.timeId = setTimer(
    timerObj,
    minuteSetting,
    startingTime,
    showNotification
  );
  // create tray
  await createTray(timerObj);
}

// auto start when login
app.setLoginItemSettings({ openAtLogin: true });
// launch app when app is ready
app.on("ready", async () => {
  console.log("app is ready");
  main();
});
