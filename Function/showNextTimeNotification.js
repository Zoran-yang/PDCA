const notifier = require("node-notifier");
const path = require("path");

function showNextTimeNotification(minuteSetting) {
  let dateString = new Date(
    new Date().getTime() + minuteSetting * 60000
  ).toLocaleString();
  let formattedString = dateString.replace(", ", " - ");
  console.log("showNextTimeNotification", "minuteSetting", minuteSetting);
  console.log("showNextTimeNotification", "dateString", dateString);
  notifier.notify({
    title: "App started",
    message: ` Next reminder is at ${formattedString} `,
    icon: path.join(__dirname, "../Asset/Icon.png"),
    sound: true,
    timeout: 7,
    reply: true,
  });
}

module.exports = showNextTimeNotification;
