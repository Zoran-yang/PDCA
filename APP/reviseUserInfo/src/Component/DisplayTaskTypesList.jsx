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
import delTaskData from "../../../AddUserInfo/src/CommonTools/Function/delTaskData.jsx";

export default function DisplayTaskTypesList({ data }) {
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
        return newItem;
      });

      // classifies the task names by task type

      setTaskInfos(formattedData);
      console.log("DisplayTasNamesList", "useEffect", formattedData); // for debug
      setIsLoading(false);
    }
  }

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
      {taskInfos.map((item) => (
        <div key={`item-${item.tasktype}`}>
          <ListItem
            key={`item-${item.tasktype}`}
            sx={
              isRevising === item.tasktype
                ? { display: "none" }
                : { display: "block" }
            }
            secondaryAction={
              <>
                <IconButton
                  aria-label="Revise"
                  onClick={() => setIsRevising(item.tasktype)}
                >
                  <CreateIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  // onClick={() => {
                  //   delTaskData("taskNames", item.id, setIsMistake);
                  // }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.tasktype} />
          </ListItem>
          <ListItem
            key={`item-${item.tasktype}-revising`}
            sx={
              isRevising === item.tasktype
                ? { display: "block" }
                : { display: "none" }
            }
            secondaryAction={
              <>
                <IconButton
                  aria-label="Done"
                  onClick={() => {
                    // saveTasksData(
                    //   "ReviseTaskName",
                    //   item.tasktype, //updated task types
                    //   newTaskName, //if null, no change, saveTasksData will return the original task name
                    //   null, // updated task tags
                    //   null, // updated task content
                    //   null, // sop id
                    //   setIsMistake, // set the mistake message
                    //   item.id
                    // );
                    setNewTaskName(null);
                    if (isMistake) return;
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
              defaultValue={item.tasktype}
              onChange={(event) => {
                setNewTaskName(event.target.value);
              }}
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
}
