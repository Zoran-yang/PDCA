const { app, BrowserWindow, Menu, Tray, dialog } = require("electron");
const path = require("path");
const notifier = require("node-notifier");
const createTray = require("./Function/createTray.js");
const settings = require("electron-settings");
const showNotification = require("./Function/showNotification.js");

let timeId;

async function intialNotification() {
  let minuteSetting = (await settings.get("setting.minute")) || 15; // default 15 minutes
  if (minuteSetting === "Stop") {
    notifier.notify({
      title: "App do not start",
      message: `Waiting for you to start`,
      icon: path.join(__dirname, "Icon.png"),
      sound: true,
      timeout: 3,
      reply: true,
    });
    return;
  }
  timeId = setInterval(() => {
    showNotification(notifier, path, BrowserWindow);
  }, minuteSetting * 60 * 1000);
  notifier.notify({
    title: "App started",
    message: `It will ask you every ${minuteSetting} minutes`,
    icon: path.join(__dirname, "Icon.png"),
    sound: true,
    timeout: 3,
    reply: true,
  });
}

intialNotification();
app.setLoginItemSettings({ openAtLogin: true }); // auto start when login
app.on("ready", () => {
  // launch app when app is ready
  createTray(
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
  );
});
