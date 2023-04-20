import { taskInfoFormat } from "../../CommonTools/Function/taskInfoFormat.jsx";
import { useEffect, useState } from "react";
import Reminder from "./Reminder.jsx";

export default function CreateReminder({
  selectedTaskTypes,
  selectedTaskNames,
  selectedTaskTags,
}) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes);
  selectedTaskNames = taskInfoFormat(selectedTaskNames);
  selectedTaskTags = taskInfoFormat(selectedTaskTags);

  const [sopData, setSopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleSopData(data) {
    setSopData(data);
  }

  useEffect(() => {
    // fetch task sops from server
    fetch("http://localhost:3000/getTaskInfos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "zoran",
        requestInfo: {
          requestType: "taskSOP",
          taskType: selectedTaskTypes,
          taskName: selectedTaskNames,
          taskTags: selectedTaskTags,
        },
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          handleSopData(await res.json());
          setIsLoading(false);
        } else {
          throw new Error("Request failed.");
        }
      })
      .catch(console.log);
  }, []);

  // render task sops
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!sopData || !sopData.length || !sopData[0].tasktype) {
    window.close();
  }

  return <Reminder sopData={sopData[0]} />;
}
