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
import deleteConfirmation from "../../../../AddUserInfo/src/CommonTools/Function/deleteConfirmation.jsx";

export default function DisplayTaskTagsList({ data }) {
  const [taskInfos, setTaskInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevising, setIsRevising] = useState(null);
  const [newTaskTag, setNewTaskTag] = useState(null);
  const [isMistake, setIsMistake] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  function formatTaskInfos(data) {
    if (data) {
      // formats the data
      let formattedData = data.map((item) => {
        let newItem = Object.assign({}, item);
        newItem["tasktag"] = JSON.parse(item["tasktag"]).title;
        return newItem;
      });

      // classifies the task names by task type

      setTaskInfos(formattedData);
      // console.log("DisplayTasNamesList", "useEffect", formattedData); // for debug
      setIsLoading(false);
    }
  }

  // re-render the updated TaskName data to DisplayTaskNamesList
  const handleUpdatedTaskTag = (originalTaskNameInfos, newTaskName) => {
    // format updated data
    const updatedTaskName = {
      tasktag: newTaskTag,
      id: originalTaskNameInfos.id,
    };
    // upadte data to revised TaskName
    setTaskInfos((prevSopData) => {
      const updatedTasks = prevSopData.map((task) => {
        if (task.id === updatedTaskName.id) {
          return updatedTaskName;
        } else {
          return task;
        }
      });
      return updatedTasks;
    });
  };

  // re-render the delete info to DisplayTaskNamesList
  const handleDeletedTaskTags = (id) => {
    // delete TaskName list
    setTaskInfos(
      (prevSopData) =>
        (prevSopData = prevSopData.filter((task) => task.id !== id))
    );
  };

  useEffect(() => {
    formatTaskInfos(data);
  }, []);

  useEffect(() => {
    if (!buttonClicked) return; // if the user has clicked the button, go to the next page
    if (isMistake) {
      setButtonClicked(false);
      return; // if there is a mistake, don't go to the next page
    }
    // if there is no mistake, go to the next step
    setNewTaskTag(null);
    handleUpdatedTaskTag(buttonClicked, newTaskTag);
    setIsRevising(null);
  }, [buttonClicked]);

  // isLoading is true when taskInfos is null
  if (isLoading) {
    return <div>Task Tags Loading...</div>;
  }

  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {taskInfos.map((item) => (
        <div key={`item-${item.tasktag}`}>
          {/* Showing Mode */}
          <ListItem
            key={`item-${item.tasktag}`}
            sx={
              isRevising === item.tasktag
                ? { display: "none" }
                : { display: "block" }
            }
            secondaryAction={
              <>
                <IconButton
                  aria-label="Revise"
                  onClick={() => {
                    setNewTaskTag(item.tasktag);
                    setIsRevising(item.tasktag);
                  }}
                >
                  <CreateIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  onClick={() => {
                    deleteConfirmation(
                      "taskTags",
                      item.id,
                      setIsMistake,
                      isMistake,
                      handleDeletedTaskTags,
                      null
                    );
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.tasktag} />
          </ListItem>
          {/* Revising Mode */}
          <ListItem
            key={`item-${item.tasktag}-revising`}
            sx={
              isRevising === item.tasktag
                ? { display: "block" }
                : { display: "none" }
            }
            secondaryAction={
              <>
                <IconButton
                  aria-label="Done"
                  onClick={() => {
                    saveTasksData(
                      "ReviseTaskTag",
                      null, //updated task types
                      null, //if null, no change, saveTasksData will return the original task name
                      newTaskTag, // updated task tags
                      null, // updated task content
                      null, // sop id
                      setIsMistake, // set the mistake message
                      item.id
                    );
                    setButtonClicked(item);
                  }}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    setNewTaskTag(null);
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
              defaultValue={item.tasktag}
              onChange={(event) => {
                setNewTaskTag(event.target.value);
              }}
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
}
