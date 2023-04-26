const { app } = require("electron");
const createTray = require("./Function/createTray.js");
const intialNotification = require("./Function/showIntialNotification.js");

let timeId;
// timer id is shared between intialNotification(setTimer) and createTray, so it can be stopped by createTray
timeId = intialNotification(timeId);
app.setLoginItemSettings({ openAtLogin: true }); // auto start when login
app.on("ready", () => {
  // launch app when app is ready
  createTray(timeId);
});
