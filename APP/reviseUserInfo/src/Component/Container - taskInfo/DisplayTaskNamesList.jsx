import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import saveTasksData from "../../../../AddUserInfo/src/CommonTools/Function/saveTasksData.jsx";
import delTaskData from "../../../../AddUserInfo/src/CommonTools/Function/delTaskData.jsx";
import deleteConfirmation from "../../../../AddUserInfo/src/CommonTools/Function/deleteConfirmation.jsx";

export default function DisplayTaskNamesList({ data }) {
  const [taskInfos, setTaskInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevising, setIsRevising] = useState(null);
  const [newTaskName, setNewTaskName] = useState(null);
  const [isMistake, setIsMistake] = useState(false);

  function formatTaskInfos(data) {
    if (data) {
      // formats the data
      let formattedData = data.map((item) => {
        let newItem = Object.assign({}, item);
        newItem["tasktype"] = JSON.parse(item["tasktype"]).title;
        newItem["taskname"] = JSON.parse(item["taskname"]).title;
        return newItem;
      });

      // classifies the task names by task type
      const taskNamesByType = {};
      formattedData.forEach((task) => {
        if (taskNamesByType[task.tasktype]) {
          taskNamesByType[task.tasktype].push(task);
        } else {
          taskNamesByType[task.tasktype] = [task];
        }
      });
      setTaskInfos(taskNamesByType);
      // console.log("DisplayTasNamesList", "useEffect", taskNamesByType); // for debug
      setIsLoading(false);
    }
  }

  // re-render the updated TaskName data to DisplayTaskNamesList
  const handleUpdatedTaskName = (originalTaskNameInfos, newTaskName) => {
    // format updated data
    const updatedTaskName = {
      tasktype: originalTaskNameInfos.tasktype,
      taskname: newTaskName,
      id: originalTaskNameInfos.id,
    };

    // upadte data to revised TaskName
    setTaskInfos((prevSopData) => {
      const updatedTasks = prevSopData[updatedTaskName.tasktype].map((task) => {
        if (task.id === updatedTaskName.id) {
          return updatedTaskName;
        } else {
          return task;
        }
      });
      const updatedPrevSopData = {
        ...prevSopData,
        [updatedTaskName.tasktype]: updatedTasks,
      };
      return updatedPrevSopData;
    });
  };

  // re-render the delete info to DisplayTaskNamesList
  const handleDeletedTaskName = (id, originalTaskNameInfos) => {
    // delete TaskName list
    setTaskInfos((prevSopData) => {
      const updatedTasks = prevSopData[originalTaskNameInfos.tasktype].filter(
        (task) => task.id !== id
      );
      const updatedPrevSopData = {
        ...prevSopData,
        [originalTaskNameInfos.tasktype]: updatedTasks,
      };
      return updatedPrevSopData;
    });
  };

  useEffect(() => {
    formatTaskInfos(data);
  }, []);

  // isLoading is true when taskInfos is null
  if (isLoading) {
    return <div>Task Names Loading...</div>;
  }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {Object.keys(taskInfos).map((key) => (
        <li key={`section-${key}`}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
            {taskInfos[key].map((item) => (
              <div key={`item-${key}-${item.taskname}`}>
                <ListItem
                  key={`item-${key}-${item.taskname}`}
                  sx={
                    isRevising === item.taskname
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  secondaryAction={
                    <>
                      <IconButton
                        aria-label="Revise"
                        onClick={() => setIsRevising(item.taskname)}
                      >
                        <CreateIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          deleteConfirmation(
                            "taskNames",
                            item.id,
                            setIsMistake,
                            isMistake,
                            handleDeletedTaskName,
                            item
                          );
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={item.taskname} />
                </ListItem>
                <ListItem
                  key={`item-${key}-${item.taskname}-revising`}
                  sx={
                    isRevising === item.taskname
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  secondaryAction={
                    <>
                      <IconButton
                        aria-label="Done"
                        onClick={() => {
                          saveTasksData(
                            "ReviseTaskName",
                            item.tasktype, //updated task types
                            newTaskName, //if null, no change, saveTasksData will return the original task name
                            null, // updated task tags
                            null, // updated task content
                            null, // sop id
                            setIsMistake, // set the mistake message
                            item.id
                          );
                          if (isMistake) return;
                          setNewTaskName(null);
                          handleUpdatedTaskName(item, newTaskName);
                          setIsRevising(null);
                        }}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="close"
                        onClick={() => {
                          setNewTaskName(null);
                          setIsRevising(null);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  }
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue={item.taskname}
                    onChange={(event) => {
                      setNewTaskName(event.target.value);
                    }}
                  />
                </ListItem>
              </div>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
