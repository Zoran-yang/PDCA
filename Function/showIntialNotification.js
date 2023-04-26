const settings = require("electron-settings");
const notifier = require("node-notifier");
const path = require("path");
const showNotification = require("./showNotification.js");
const setTimer = require("./setTimer.js");

async function intialNotification(timeId) {
  // let minuteSetting = (await settings.get("setting.minute")) || 15; // default 15 minutes
  let minuteSetting = (await settings.get("setting.minute")) || 0.2; // for debug
  let startingTime = (await settings.get("setting.startTime")) || "From Now"; // default from now
  // Timer was stopped before, so do not start it again
  if (minuteSetting === "Stop") {
    notifier.notify({
      title: "App do not start",
      message: `Waiting for you to start`,
      icon: path.join(__dirname, "../Asset/Icon.png"),
      sound: true,
      timeout: 3,
      reply: true,
    });
    return;
  }

  // show notification when app is started
  notifier.notify({
    title: "App started",
    message: `It will ask you every ${minuteSetting} minutes`,
    icon: path.join(__dirname, "../Asset/Icon.png"),
    sound: true,
    timeout: 3,
    reply: true,
  });

  timeId = setTimer(timeId, minuteSetting, startingTime, showNotification);

  return timeId;
}

module.exports = intialNotification;
