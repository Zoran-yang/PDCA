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
import saveTasksData from "../../../AddUserInfo/src/CommonTools/Function/saveTasksData.jsx";

export default function DisplayTaskNamesList({ data }) {
  const [taskInfos, setTaskInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevising, setIsRevising] = useState(null);
  const [newTaskName, setNewTaskName] = useState(null);
  const [isMistake, setIsMistake] = useState(false);

  useEffect(() => {
    if (data) {
      // formats the data
      let formattedData = data.map((item) => {
        // console.log("DisplayTasNamesList", "useEffect item", item);
        item["tasktype"] = JSON.parse(item["tasktype"]).title;
        item["taskname"] = JSON.parse(item["taskname"]).title;
        return item;
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
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
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
                      <IconButton aria-label="Delete">
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
                          setNewTaskName(null);
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
